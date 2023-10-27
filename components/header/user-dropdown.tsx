"use client";

import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { deleteCookie } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { User as UserType } from "@prisma/client";

interface UserDropdownProps {
  user: UserType;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();

  function logout() {
    deleteCookie("x-auth-token");
    router.push("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <User className="w-4 h-4 mr-2" /> {user.firstName} {user?.lastName}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
