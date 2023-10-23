import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { UserDropdown } from "./user-dropdown";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { exclude } from "../../lib/helper";

export async function HeaderWrapper() {
  const { value: token } = cookies().get("x-auth-token") as RequestCookie;

  if (!token) redirect("/login");

  const { id } = jwt.decode(token) as User;

  const userObj = await db.user.findFirst({
    where: {
      id: id,
    },
  });

  const user = exclude(userObj, ["password"]) as User;

  return (
    <header className="px-4 py-4 bg-black/80 sticky top-0" id="header">
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
