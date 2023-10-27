import currentUser from "@/hooks/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse(
        "Unauthenticated. The token provided is invalid",
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("id");
    if (!postId) {
      return new NextResponse("Post Id missing", { status: 400 });
    }

    const { comment: commentMessage } = await req.json();

    const comment = await db.comment.create({
      data: {
        userId: user.id,
        postId: parseInt(postId),
        comment: commentMessage as string,
      },
    });

    return NextResponse.json({
      message: "You have commented successfully.",
      comment,
    });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse(
        "Unauthenticated. The token provided is invalid",
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("pid");
    const commentId = searchParams.get("cid");
    if (!postId) {
      return new NextResponse("Post Id missing", { status: 400 });
    }
    if (!commentId) {
      return new NextResponse("Comment Id missing", { status: 400 });
    }

    const { comment: commentMessage } = await req.json();

    const comment = await db.comment.update({
      where: {
        postId: parseInt(postId),
        id: parseInt(commentId),
      },
      data: {
        comment: commentMessage as string,
      },
    });

    return NextResponse.json({
      message: "Your comment has been successfully updated.",
      comment,
    });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse(
        "Unauthenticated. The token provided is invalid",
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("pid");
    const commentId = searchParams.get("cid");
    if (!postId) {
      return new NextResponse("Post Id missing", { status: 400 });
    }
    if (!commentId) {
      return new NextResponse("Comment Id missing", { status: 400 });
    }

    await db.comment.delete({
      where: {
        postId: parseInt(postId),
        id: parseInt(commentId),
      },
    });
    return NextResponse.json({
      message: "Your comment has been successfully deleted.",
    });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
