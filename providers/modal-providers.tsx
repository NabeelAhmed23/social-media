import { CreatePostModal } from "@/components/modals/create-post-modal";
import { UploadImageModal } from "@/components/modals/upload-image-modal";
import React from "react";

export default function ModalProviders() {
  return (
    <>
      <UploadImageModal />
      <CreatePostModal />
    </>
  );
}
