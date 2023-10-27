import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Post, User } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Edit,
  MessageCircle,
  MoreVertical,
  ThumbsDown,
  ThumbsUp,
  Trash,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Comment } from "../profile/post-components/comment";
import { CommentsList } from "../profile/post-components/comments-list";
import { db } from "@/lib/db";

interface PostItemProps {
  user: User;
  post: Post;
}

export default async function PostItem({ user, post }: PostItemProps) {
  const comments = await db.comment.findMany({
    where: {
      postId: post.id,
    },
    include: {
      user: true,
    },
  });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between sm:flex-row">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.profileImageUrl as string | undefined} />
            <AvatarFallback className="uppercase">
              {user.firstName.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <strong className="text-sm font-medium">
              {user.firstName} {user?.lastName}
            </strong>
            <span className="text-xs black/60">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
        <Popover>
          <PopoverTrigger>
            <MoreVertical className="w-5 h-5" />
          </PopoverTrigger>
          <PopoverContent className="p-1 w-40">
            <Button variant="ghost" className="w-full justify-start">
              <Edit className="w-5 h-5 mr-2" />
              Edit post
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Trash className="w-5 h-5 mr-2" />
              Delete post
            </Button>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="px-0">
        {post.postImage && (
          <AspectRatio ratio={832 / 385} className="mb-4">
            <Image
              src={post.postImage as string}
              alt={`Image of post created by ${user.firstName} ${user?.lastName}`}
              fill
              className="object-cover"
            />
          </AspectRatio>
        )}
        {post.content && <p className={"px-4 text-sm"}>{post?.content}</p>}
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <div className="flex items-center justify-between w-full border-b ">
          <div className="flex items-center gap-4  pb-3">
            <div>
              <ThumbsUp className="text-black/60 w-5 h-5 inline-block -mt-1" />{" "}
              <span className="inline-block text-sm">12.5k</span>
            </div>
            <div>
              <ThumbsDown className="text-black/60 w-5 h-5 inline-block mt-1" />{" "}
              <span className="inline-block text-sm">12.5k</span>
            </div>
          </div>
          <div>
            <MessageCircle className="w-5 h-5 mr-1 inline-block" />
            <span className="text-xs text-black">
              {comments.length} comments
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 py-1 w-full border-b">
          <Button variant="ghost" className="flex-grow hover:no-underline">
            <ThumbsUp className="w-5 h-5 mr-2" /> <span>Like</span>
          </Button>
          <Button variant="ghost" className="flex-grow hover:no-underline">
            <ThumbsDown className="w-5 h-5 mr-2" /> <span>Dislike</span>
          </Button>
          <Button variant="ghost" className="flex-grow hover:no-underline">
            <MessageCircle className="w-5 h-5 mr-2" /> <span>Comment</span>
          </Button>
        </div>
        <div className="w-full">
          <CommentsList comments={comments} id={post.id} />
          <Comment user={user} id={post.id} />
        </div>
      </CardFooter>
    </Card>
  );
}
