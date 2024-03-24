import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  const { original } = await req.json();
  const short = nanoid(7); // Generate a short URL of 7 characters

  const shortUrl = await prisma.shortUrl.create({
    data: {
      original,
      short,
    },
  });

  return NextResponse.json(shortUrl, { status: 201 });
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
