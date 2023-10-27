import { ProfileHeader } from "@/components/profile/profile-header";
import React from "react";
import { ProfileUserInfo } from "@/components/profile/profile-user-info";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import ProfileNewsFeed from "@/components/profile/profile-newsfeed";
import currentUser from "@/hooks/current-user";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: Params }) {
  const currentUserObject = await currentUser();
  const dbFoundUser = await db.user.findFirst({
    where: {
      id: params.profileId,
    },
  });

  if (!currentUserObject) redirect("/login");
  if (!dbFoundUser) return notFound();
  let user, isMyProfile;
  if (currentUserObject.id === dbFoundUser.id) {
    user = currentUserObject;
    isMyProfile = true;
  } else {
    user = dbFoundUser;
    isMyProfile = false;
  }
  return (
    <main className="container px-4 max-w-[1024px]">
      <ProfileHeader
        coverImageUrl={user?.coverImageUrl}
        name={`${user?.firstName} ${user?.lastName}`}
        isMyProfile={isMyProfile}
      />
      <ProfileUserInfo user={user} isMyProfile={isMyProfile} />
      <div className="container px-4 max-w-[1024px] mt-8">
        <div className="grid grid-cols-[40%_60%] gap-4">
          <ProfileSidebar user={user} isMyProfile={isMyProfile} />
          <div>
            <ProfileNewsFeed user={user} isMyProfile={isMyProfile} />
          </div>
        </div>
      </div>
    </main>
  );
}
