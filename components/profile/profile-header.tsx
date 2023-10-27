"use client";

import React from "react";
import Image from "next/image";
import { UploadImageModal } from "../modals/upload-image-modal";
import { Button } from "../ui/button";
import { Camera } from "lucide-react";
import { useModal } from "@/hooks/use-modal";

interface ProfileHeaderProps {
  coverImageUrl?: string | null;
  name: string;
  isMyProfile: boolean;
}

export function ProfileHeader({
  coverImageUrl,
  name,
  isMyProfile,
}: ProfileHeaderProps) {
  const { onOpen } = useModal();
  return (
    <>
      <div className="h-72 rounded-b-xl overflow-hidden bg-slate-200 shadow-inner relative group">
        {coverImageUrl && (
          <Image
            src={coverImageUrl ?? ""}
            alt={name}
            fill
            quality={90}
            sizes="(min-width: 1095px) 1095px ,100vw"
            className="object-cover"
          />
        )}
        {isMyProfile && (
          <div className="p-4 absolute right-0 bottom-0">
            <Button
              onClick={() =>
                onOpen("uploadImage", {
                  apiUrl: "/api/update",
                  title: "Upload cover photo",
                  type: "coverImageUrl",
                })
              }
              className="opacity-0 group-hover:opacity-100 transition bg-black/40"
            >
              <Camera className="w-5 h-5 mr-2" /> Edit cover photo
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
