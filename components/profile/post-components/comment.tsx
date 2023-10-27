"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { Send } from "lucide-react";
import React from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import qs from "query-string";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { commentSchema } from "@/lib/form-schemas";

interface CommentProps {
  user: User;
  id: number;
}

export function Comment({ user, id }: CommentProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const isClean = !form.control.getFieldState("comment").isDirty;

  async function onCommentSubmit(value: z.infer<typeof commentSchema>) {
    const url = qs.stringifyUrl({
      url: "/api/comment",
      query: {
        id,
      },
    });

    try {
      await axios.post(url, value);
      toast({
        title: "Success",
        description: "You have successfully commented and will be live shortly",
      });
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="pt-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user?.profileImageUrl as string | undefined} />
          <AvatarFallback className="uppercase">
            {user.firstName.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className=" flex-1 flex items-center justify-between rounded-full bg-slate-200 pl-4 pr-2">
          <Form {...form}>
            <form
              className="flex-1 flex items-center"
              onSubmit={form.handleSubmit(onCommentSubmit)}
            >
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
                        className="bg-transparent text-sm pl-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />

              <div>
                <Button
                  variant="ghost"
                  className="p-1 w-8 h-8 rounded-full "
                  type="submit"
                  disabled={isLoading || isClean}
                >
                  <Send
                    className={`w-4 h-4 ${
                      isClean
                        ? "fill-slate-400 text-slate-400"
                        : "fill-blue-500 text-blue-500"
                    }`}
                  />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
