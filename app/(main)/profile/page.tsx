import { ProfileHeader } from "@/components/profile/profile-header";
import React from "react";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ProfileUserInfo } from "@/components/profile/profile-user-info";

export default async function Page() {
  const { value: token } = cookies().get("x-auth-token") as RequestCookie;

  if (!token) redirect("/login");

  const { id } = jwt.decode(token) as User;

  const user = await db.user.findFirst({
    where: {
      id: id,
    },
  });

  return (
    <main className="max-w-[1095px] mx-auto">
      <ProfileHeader
        coverImageUrl={user?.coverImageUrl}
        name={`${user?.firstName} ${user?.lastName}`}
      />
      <ProfileUserInfo user={user as User} />
    </main>
  );
}
