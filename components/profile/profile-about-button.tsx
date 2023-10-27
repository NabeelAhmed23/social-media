"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { UserIcon } from "lucide-react";
import { User } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const aboutSchema = z.object({
  about: z.string().min(1, {
    message: "About field cannot be empty",
  }),
});

interface ProfileAboutButtonProps {
  user: User;
  isMyProfile: boolean;
}

export default function ProfileAboutButton({
  user,
  isMyProfile,
}: ProfileAboutButtonProps) {
  const [showInput, setShowInput] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof aboutSchema>>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      about: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async ({ about }: z.infer<typeof aboutSchema>) => {
    try {
      await axios.post("/api/update", { data: about, type: "about" });
      toast({
        title: "Success",
        description: "Your bio has been successfully updated.",
      });
      setShowInput(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  if (showInput) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Tell us about yourself..."
                    className="resize-none"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage className="font-light text-xs" />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="ghost" onClick={() => setShowInput(false)}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    );
  }
  return (
    <div>
      {!user?.about ? (
        <>
          {isMyProfile && (
            <Button className="w-full" onClick={() => setShowInput(true)}>
              Add About
            </Button>
          )}
        </>
      ) : (
        <div className="flex items-start">
          <div className="w-5 h-5 mr-2">
            <UserIcon className="w-5 h-5" />
          </div>
          <p className="text-sm text-black/70">{user.about}</p>
        </div>
      )}
    </div>
  );
}
