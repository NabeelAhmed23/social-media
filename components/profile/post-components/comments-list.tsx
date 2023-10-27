import React from "react";
import { SingleComment } from "./single-comment";
import { CommentWithUser } from "@/types";

interface CommentsListProps {
  comments: CommentWithUser[];
  id: number;
}
export async function CommentsList({ comments, id }: CommentsListProps) {
  if (comments.length === 0) return null;

  return (
    <div className="mt-4">
      {comments.map((comment) => (
        <SingleComment comment={comment} key={comment.id} id={id} />
      ))}
    </div>
  );
}
