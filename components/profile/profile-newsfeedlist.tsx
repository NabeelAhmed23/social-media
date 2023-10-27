import React from "react";
import PostItem from "../post/post-item";
import { CommentWithUser, PostWithUserAndComments } from "@/types";

interface ProfileNewsFeedListProps {
  posts: PostWithUserAndComments[];
}

export default async function ProfileNewsfeedList({
  posts,
}: ProfileNewsFeedListProps) {
  return (
    <div className="flex flex-col gap-4 pb-4">
      {posts.map((post) => (
        <PostItem
          user={post.user}
          key={post.id}
          post={post}
          comments={post.comments as CommentWithUser[]}
        />
      ))}
    </div>
  );
}
