import React from "react";
import { User } from "@prisma/client";
import ProfileNewsfeedList from "./profile-newsfeedlist";
import { CreatePost } from "../post/create-post";

export function ProfileNewsFeed({ user }: { user: User }) {
  return (
    <>
      <CreatePost user={user} />
      <ProfileNewsfeedList user={user} />
    </>
  );
}
