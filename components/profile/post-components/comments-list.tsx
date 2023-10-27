import React from "react";
import { SingleComment } from "./single-comment";
import { CommentWithUser } from "@/types";
import currentUser from "@/hooks/current-user";
import { User } from "@prisma/client";

interface CommentsListProps {
  comments: CommentWithUser[];
  id: number;
}
export async function CommentsList({ comments, id }: CommentsListProps) {
  if (comments.length === 0) return null;
  const user = await currentUser();

  return (
    <div className="mt-4">
      {comments.map((comment) => (
        <SingleComment
          comment={comment}
          key={comment.id}
          id={id}
          user={user as User}
        />
      ))}
    </div>
  );
}
