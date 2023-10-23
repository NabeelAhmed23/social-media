"use client";

import { Button } from "../ui/button";
import { Camera } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FileUpload } from "../file-upload";
import { useEffect, useState } from "react";

import axios from "@/service/axios";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

interface UploadImageModalProps {
  apiEndpoint: string;
  children: React.ReactNode;
  title: string;
}

export function UploadImageModal({
  apiEndpoint,
  children,
  title,
}: UploadImageModalProps) {
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  async function onCoverSave() {
    try {
      await axios.post(apiEndpoint, { imageUrl });
      toast({
        title: "Success",
        description: "Your image has been successfully uploaded",
      });

      router.refresh();
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(
    () => () => {
      setImageUrl("");
    },
    []
  );
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <div className="grid place-items-center mt-4">
            <FileUpload
              onChange={(value) => setImageUrl(value as string)}
              value={imageUrl}
            />
          </div>
          <DialogFooter className="pt-4 flex justify-end">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button disabled={!imageUrl} onClick={onCoverSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
