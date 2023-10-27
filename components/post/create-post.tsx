"use client";

import { User } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useModal } from "@/hooks/use-modal";

export function CreatePost({ user }: { user: User }) {
  const { onOpen } = useModal();
  return (
    <div className="p-4 rounded-xl bg-white flex items-center gap-3 border">
      <Avatar>
        <AvatarImage src={user.profileImageUrl as string} />
        <AvatarFallback className="uppercase">
          {user.firstName.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <Button
        variant="ghost"
        onClick={() => onOpen("createPost")}
        className="bg-[#eee] text-black/60 hover:text-black/50 rounded-full w-full justify-start"
      >
        What&apos;s on your mind?
      </Button>
    </div>
  );
}
