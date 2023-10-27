import React from "react";
import PostItem from "../post/post-item";
import { User } from "@prisma/client";
import { db } from "@/lib/db";

export default async function ProfileNewsfeedList({ user }: { user: User }) {
  const posts = await db.post.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="mt-4 flex flex-col gap-4 pb-4">
      {posts.map((post) => (
        <PostItem user={user} key={post.id} post={post} />
      ))}
    </div>
  );
}
