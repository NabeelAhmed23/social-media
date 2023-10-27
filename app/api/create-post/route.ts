import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("X-Auth-Token");
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isTokenValid = jwt.verify(token, process.env.JWT_TOKEN!);

    if (!isTokenValid) {
      return new NextResponse("Invalid Token", { status: 401 });
    }

    const user = jwt.decode(token) as User;
    const { content, imageUrl } = await req.json();

    if (!content && !imageUrl) {
      return NextResponse.json(
        { error: "Message and Image both cannot be empty" },
        { status: 400 }
      );
    }

    const post = await db.post.create({
      data: {
        content,
        postImage: imageUrl,
        userId: user.id,
      },
    });
    return NextResponse.json({ message: "New post has been created", post });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
