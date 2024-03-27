import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";
import redis from "../../../lib/redis";

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const short = pathname.split("/").pop();

  if (!short) {
    return NextResponse.json(
      { message: "Short URL not provided" },
      { status: 400 }
    );
  }

  // Check redis cache
  const cachedUrl = await redis.get<string>(short);
  if (cachedUrl) {
    return NextResponse.redirect(cachedUrl);
  }

  const shortUrl = await prisma.shortUrl.findUnique({
    where: { short },
  });

  if (shortUrl) {
    if (new Date() > new Date(shortUrl.expiresAt)) {
      return NextResponse.json(
        { message: "This short URL has expired." },
        { status: 410 }
      );
    }

    let originalUrl = shortUrl.original;
    if (!/^https?:\/\//i.test(originalUrl)) {
      originalUrl = "https://" + originalUrl;
    }

    // Update cache
    await redis.set(short, originalUrl);

    return NextResponse.redirect(originalUrl);
  } else {
    return NextResponse.json(
      { message: "Short URL not found." },
      { status: 404 }
    );
  }
}
