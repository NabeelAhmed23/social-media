"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "../ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { RegisterModal } from "./register-modal";
import qs from "query-string";
import axios from "axios";
import { useState } from "react";
import { InputError } from "../input-error";
import { Loader2 } from "lucide-react";
import { setCookie } from "@/lib/helper";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password is invalid",
  }),
});

export const LoginForm = () => {
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError({ email: "", password: "" });
    try {
      const url = qs.stringifyUrl({
        url: "/api/login",
      });
      const res = await axios.post(url, values);
      router.push("/");
      setCookie("x-auth-token", res.data.token, 1);
    } catch (error: any) {
      setError(error.response.data.error);
    }
  }
  return (
    <Card className="w-full md:max-w-96 md:ml-auto shadow-sm">
      <CardContent className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-normal" />
                  {error?.email && <InputError error={error?.email} />}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      disabled={isLoading}
                      {...field}
                      className="mt-4"
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-normal" />
                  {error?.password && <InputError error={error?.password} />}
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <Link
            href="#"
            className="text-blue-600 text-center font-medium text-sm block mt-4 hover:underline"
          >
            Forgot Password?
          </Link>

          <Separator className="my-4" />

          <div className="text-center">
            <RegisterModal>
              <div className="text-white font-bold bg-[#42B72A] hover:bg-[#42B72A]/70 py-3 px-5 rounded-md">
                Create new account
              </div>
            </RegisterModal>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
