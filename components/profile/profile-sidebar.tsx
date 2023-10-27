import { User } from "@prisma/client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Clock, Mail, User as UserIcon } from "lucide-react";
import ProfileAboutButton from "./profile-about-button";
import moment from "moment";

interface ProfileSidebarProps {
  user: User;
  isMyProfile: boolean;
}

export function ProfileSidebar({ user, isMyProfile }: ProfileSidebarProps) {
  return (
    <div>
      <div className="sticky top-20">
        <Card>
          <CardHeader>
            <CardTitle>Intro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="text-sm flex items-center text-black/70">
                <Calendar className="w-5 h-5 mr-2" />{" "}
                {new Date(user.dob as string).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-sm flex items-center text-black/70">
                <Mail className="w-5 h-5 mr-2" /> {user.email}
              </div>
              <div className="text-sm flex items-center text-black/70">
                <Clock className="w-5 h-5 mr-2" /> Joined{" "}
                {moment(new Date(user.createdAt)).fromNow()}
              </div>
              <ProfileAboutButton user={user} isMyProfile={isMyProfile} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
