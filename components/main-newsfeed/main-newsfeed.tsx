import { db } from "@/lib/db";
import React from "react";
import ProfileNewsfeedList from "../profile/profile-newsfeedlist";

export async function MainNewsFeed() {
  const posts = await db.post.findMany({
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <ProfileNewsfeedList posts={posts} />
    </div>
  );
}
