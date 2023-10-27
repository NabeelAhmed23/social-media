import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { UserDropdown } from "./user-dropdown";
import Link from "next/link";
import currentUser from "@/hooks/current-user";

export async function HeaderWrapper() {
  const user = await currentUser();
  if (!user) return null;

  return (
    <header className="px-4 py-4 bg-foreground sticky top-0 z-10" id="header">
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="handBook Logo"
                height={40}
                width={40}
              />
            </Link>
          </div>
          <div className="flex items-center gap-x-4">
            <Button className="p-2 rounded-full bg-zinc-700  hover:bg-zinc-800">
              <Bell className="w-6 h-6 text-slate-200" />
            </Button>
            <UserDropdown user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
