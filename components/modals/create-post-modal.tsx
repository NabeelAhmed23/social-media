"use client";

import { useModal } from "@/hooks/use-modal";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "../ui/use-toast";
import Image from "next/image";
import { FileUpload } from "../file-upload";
import TextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/navigation";

export function CreatePostModal() {
  const { isOpen, type, onClose } = useModal();
  const [content, setContent] = useState("");
  const [imageLink, setImageLink] = useState("");
  const router = useRouter();
  const open = isOpen && type === "createPost";

  async function onPostSubmit() {
    try {
      await axios.post("/api/create-post", {
        content: content,
        imageUrl: imageLink,
      });
      toast({
        title: "Success",
        description: "Your post has been created and will be live shortly.",
      });
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>

        <div>
          <TextareaAutosize
            minRows={2}
            maxRows={7}
            className="w-full resize-none p-1"
            placeholder="What's on your mind?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />

          <div className="mt-4">
            {!imageLink ? (
              <FileUpload
                onChange={(url: string | undefined) =>
                  setImageLink(url ? url : "")
                }
                value={imageLink}
              />
            ) : (
              <div className="relative">
                <Image src={imageLink} alt={"Post created by User"} fill />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onPostSubmit}>Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
