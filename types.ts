import { Comment, Post, User } from "@prisma/client";

export type CommentWithUser = Comment & { user: User };

export type PostWithUserAndComments = Post & {
  user: User;
  comments: Comment[];
};
