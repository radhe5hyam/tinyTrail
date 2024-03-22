import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const short = pathname.split("/").pop();

  if (!short) {
    return NextResponse.json(
      { message: "Short URL not provided" },
      { status: 400 }
    );
  }

  const shortUrl = await prisma.shortUrl.findUnique({
    where: { short },
  });
  console.log("shorturl: " + JSON.stringify(shortUrl));

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

    return NextResponse.redirect(originalUrl);
  } else {
    return NextResponse.json(
      { message: "Short URL not found." },
      { status: 404 }
    );
  }
}
