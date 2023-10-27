import { ProfileHeader } from "@/components/profile/profile-header";
import React from "react";
import { User } from "@prisma/client";
import { ProfileUserInfo } from "@/components/profile/profile-user-info";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { ProfileNewsFeed } from "@/components/profile/profile-newsfeed";
import currentUser from "@/hooks/current-user";

export default async function Page() {
  const user = (await currentUser()) as User;

  return (
    <main className="container px-4 max-w-[1024px]">
      <ProfileHeader
        coverImageUrl={user?.coverImageUrl}
        name={`${user?.firstName} ${user?.lastName}`}
      />
      <ProfileUserInfo user={user} />
      <div className="container px-4 max-w-[1024px] mt-8">
        <div className="grid grid-cols-[40%_60%] gap-4">
          <ProfileSidebar user={user} />
          <div>
            <ProfileNewsFeed user={user} />
          </div>
        </div>
      </div>
    </main>
  );
}
