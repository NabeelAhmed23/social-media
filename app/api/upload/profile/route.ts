import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "@/lib/db";
import { User } from "@prisma/client";

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
    const { imageUrl } = await req.json();
    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        profileImageUrl: imageUrl,
      },
    });

    return NextResponse.json({
      message: "Profile Image has been successfully updated",
    });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
