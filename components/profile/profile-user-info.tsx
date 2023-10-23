import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Camera } from "lucide-react";
import { UploadImageModal } from "../modals/upload-image-modal";
import { User } from "@prisma/client";

interface ProfileUserInfoProps {
  user: User;
}

export function ProfileUserInfo({ user }: ProfileUserInfoProps) {
  return (
    <div className="px-6 -mt-20 w-full">
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

        <UploadImageModal
          apiEndpoint="/api/upload/profile"
          title="Upload your profile photo"
        >
          <Button className="absolute rounded-full p-2 right-1 bottom-1 z-10">
            <Camera />
          </Button>
        </UploadImageModal>
      </div>
    </div>
  );
}
