import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: { email: "No user found for the given email" } },
        {
          status: 404,
        }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: {
            email: "Email or password is not valid",
            password: "Email or password is not valid",
          },
        },
        {
          status: 400,
        }
      );
    }

    const userObj = {
      id: user.id,
      firstName: user.firstName,
      lastName: user?.lastName,
      name: `${user.firstName} ${user?.lastName}`,
      email: user.email,
    };

    const token = jwt.sign(userObj, process.env.JWT_TOKEN!);

    return NextResponse.json({ token });
  } catch (error: any) {
    return new NextResponse("Error", { status: error.response.status });
  }
}
