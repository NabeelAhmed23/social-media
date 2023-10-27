import React from "react";
import { User } from "@prisma/client";
import ProfileNewsfeedList from "./profile-newsfeedlist";
import { CreatePost } from "../post/create-post";
import { db } from "@/lib/db";

interface ProfileNewsFeedProps {
  user: User;
  isMyProfile: boolean;
}

export default async function ProfileNewsFeed({
  user,
  isMyProfile,
}: ProfileNewsFeedProps) {
  const posts = await db.post.findMany({
    where: {
      userId: user.id,
    },
    include: {
      comments: {
        include: {
          user: true,
        },
      },
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      {isMyProfile && <CreatePost user={user} />}
      <div className={isMyProfile ? "mt-4" : ""}>
        <ProfileNewsfeedList posts={posts} />
      </div>
    </>
  );
}
