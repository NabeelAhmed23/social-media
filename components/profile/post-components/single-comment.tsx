"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import moment from "moment";
import { CommentWithUser } from "@/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { commentSchema } from "@/lib/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import queryString from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "@prisma/client";

interface SingleCommentProps {
  comment: CommentWithUser;
  id: number;
  user: User;
}

export function SingleComment({ comment, id, user }: SingleCommentProps) {
  const [showInput, setShowInput] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: comment.comment || "",
    },
  });

  const isMyComment = user.id === comment.user.id;

  async function onCommentSubmit(values: z.infer<typeof commentSchema>) {
    const url = queryString.stringifyUrl({
      url: "/api/comment",
      query: {
        pid: id,
        cid: comment.id,
      },
    });

    try {
      await axios.put(url, { comment: values.comment });
      form.reset();
      router.refresh();
      setShowInput(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function onDelete() {
    const url = queryString.stringifyUrl({
      url: "/api/comment",
      query: {
        pid: id,
        cid: comment.id,
      },
    });

    try {
      await axios.delete(url);
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <div
      key={comment.id}
      className="flex items-start justify-between gap-2 mt-4"
    >
      <div className="flex items-start gap-2 flex-1">
        <Avatar>
          <AvatarImage
            src={comment.user.profileImageUrl as string}
            alt={`${comment.user.firstName} ${comment.user?.lastName}`}
          />
          <AvatarFallback className="uppercase">
            {comment.user.firstName.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        {showInput ? (
          <div className="flex-1">
            <Form {...form}>
              <form className="" onSubmit={form.handleSubmit(onCommentSubmit)}>
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          required
                          placeholder="Write a comment..."
                          className=" text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-destructive" />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-1 mt-1">
                  <Button
                    className="text-xs"
                    variant="ghost"
                    onClick={() => setShowInput(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="text-xs">Save</Button>
                </div>
              </form>
            </Form>
          </div>
        ) : (
          <div>
            <div className="bg-foreground rounded-xl px-3 pb-2 pt-1">
              <Link
                href={`/profile/${comment.userId}`}
                className="font-medium text-sm text-background"
              >
                {comment.user.firstName} {comment.user?.lastName}
              </Link>
              <p className="text-sm text-background">{comment.comment}</p>
            </div>
            <div className="pl-2">
              <span className="text-xs text-black/70">
                {moment(new Date(comment.createdAt)).fromNow()}
              </span>
            </div>
          </div>
        )}
      </div>
      {isMyComment && (
        <Popover>
          <PopoverTrigger>
            <MoreVertical className="w-5 h-5" />
          </PopoverTrigger>
          <PopoverContent className="p-0 max-w-[160px]">
            <Button
              variant="ghost"
              className="w-full justify-start font-light"
              onClick={() => setShowInput(true)}
            >
              <Edit className="w-5 h-5 mr-2" /> Edit
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start font-light"
              onClick={() => setOpen(true)}
            >
              <Trash className="w-5 h-5 mr-2" />
              Delete
            </Button>
          </PopoverContent>
        </Popover>
      )}

      <AlertDialog open={open} onOpenChange={() => setOpen(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              comment from this post and from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
