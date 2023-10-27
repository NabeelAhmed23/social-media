"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Camera, Pencil } from "lucide-react";
import { User } from "@prisma/client";
import { useModal } from "@/hooks/use-modal";

interface ProfileUserInfoProps {
  user: User;
  isMyProfile: boolean;
}

export function ProfileUserInfo({ user, isMyProfile }: ProfileUserInfoProps) {
  const { onOpen } = useModal();
  return (
    <div className="px-6 -mt-20 w-full">
      <div className="flex sm:flex-row flex-col sm:items-end">
        <div className="relative w-40">
          <div className="aspect-square w-40 rounded-full overflow-hidden relative z-[1] ring-4 ring-white">
            {user?.profileImageUrl ? (
              <Image
                src={(user?.profileImageUrl as string) ?? ""}
                alt={`${user.firstName} ${user?.lastName}`}
                fill
                className="bg-slate-300"
              />
            ) : (
              <div className="grid place-items-center w-full h-full text-4xl uppercase font-semibold bg-slate-400">
                {user.firstName.substring(0, 2)}
              </div>
            )}
          </div>
          {isMyProfile && (
            <Button
              className="absolute rounded-full p-2 right-1 bottom-1 z-[2]"
              onClick={() =>
                onOpen("uploadImage", {
                  apiUrl: "/api/update",
                  title: "Upload your profile photo",
                  type: "profileImageUrl",
                })
              }
            >
              <Camera />
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between flex-1">
          <div className="px-4 pb-4">
            <p className="text-xl font-semibold">
              {user.firstName} {user?.lastName}
            </p>
            <p>{user.email}</p>
          </div>
          {isMyProfile && (
            <Button>
              <Pencil className="text-white w-4 h-4 mr-2" /> Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
