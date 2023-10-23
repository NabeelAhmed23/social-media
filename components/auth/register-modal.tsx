"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { useMounted } from "@/hooks/use-mounted";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import Link from "next/link";
import queryString from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: "First Name is required",
    })
    .max(32, {
      message: "First Name is too long",
    }),
  lastName: z.string(),
  email: z.string().email().min(1, {
    message: "Email is required",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password should be atleast 8 characters",
    })
    .max(32, {
      message: "Password cannot be more than 32 characters",
    }),
  dob: z.date(),
  gender: z.string(),
});

export function RegisterModal({ children }: { children: React.ReactNode }) {
  const isMounted = useMounted();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = queryString.stringifyUrl({
        url: "/api/register",
      });

      await axios.post(url, values);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  if (!isMounted) return null;
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="p-0 gap-0">
        <DialogHeader className="text-left">
          <div className="p-3 border-b">
            <h2 className="text-3xl font-semibold">Sign Up</h2>
            <p className="mt-1 text-black/70 text-sm">
              It&apos;s easy and quick.
            </p>
          </div>
        </DialogHeader>
        <div className="p-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-wrap gap-x-4 gap-y-3">
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input placeholder="First Name*" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        placeholder="Email*"
                        type="email"
                        {...field}
                        className="mt-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        placeholder="Password*"
                        type="password"
                        className="mt-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-4">
                    <FormLabel className="font-normal text-sm -mb-1 inline-block">
                      Date of birth
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="font-normal text-sm -mb-1 block">
                      Gender
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Genders</SelectLabel>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="mt-4">
                <p className="font-normal text-xs text-black">
                  People who use our service may have uploaded your contact
                  information to Facebook.{" "}
                  <Link href="#" className="hover:underline text-blue-500">
                    Learn more.
                  </Link>
                </p>
                <p className="font-normal text-xs text-black mt-2">
                  By clicking Sign Up, you agree to our{" "}
                  <Link href="#" className="hover:underline text-blue-500">
                    Terms
                  </Link>
                  ,{" "}
                  <Link href="#" className="hover:underline text-blue-500">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="hover:underline text-blue-500">
                    Cookies Policy
                  </Link>
                  . You may receive SMS notifications from us and can opt out at
                  any time.
                </p>
              </div>
              <div className="mt-4 grid place-items-center">
                <Button
                  disabled={isLoading}
                  className="text-white font-bold bg-[#37a122] hover:bg-[#37a122]/70 px-8 text-lg"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
