import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import currentUser from "@/hooks/current-user";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { data, type } = await req.json();
    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        [type]: data,
      },
    });

    return NextResponse.json({
      message: "Profile has been successfully updated",
    });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
