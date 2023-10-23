import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const existingUser = await db.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: { email: "User already exists with this email" },
        },
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data.password, salt);

    const user = { ...data, password: hash };

    await db.user.create({
      data: { ...user },
    });

    return NextResponse.json({ message: "User has been registered" });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
