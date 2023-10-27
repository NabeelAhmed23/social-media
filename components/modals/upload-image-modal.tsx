"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FileUpload } from "../file-upload";
import { useEffect, useState } from "react";

import axios from "@/service/axios";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { useModal } from "@/hooks/use-modal";

export function UploadImageModal() {
  const [imageUrl, setImageUrl] = useState("");
  const { isOpen, data, type, onClose } = useModal();

  const open = isOpen && type === "uploadImage";
  const router = useRouter();
  async function onSubmit() {
    if (typeof data?.onImageSubmit !== "undefined") {
      data.onImageSubmit(imageUrl);
    }
    try {
      await axios.post(data.apiUrl as string, {
        data: imageUrl,
        type: data.type,
      });
      toast({
        title: "Success",
        description: "Your image has been successfully uploaded",
      });
      setImageUrl("");
      router.refresh();
      onClose();
    } catch (error: any) {
      console.log(error.message);
    }
  }

  function closeModal() {
    setImageUrl("");
    onClose();
  }

  useEffect(
    () => () => {
      setImageUrl("");
    },
    []
  );
  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data.title}</DialogTitle>

          <div className="grid place-items-center mt-4">
            <FileUpload
              onChange={(value) => setImageUrl(value as string)}
              value={imageUrl}
            />
          </div>
          <DialogFooter className="pt-4 flex justify-end">
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button disabled={!imageUrl} onClick={onSubmit}>
              Save
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
