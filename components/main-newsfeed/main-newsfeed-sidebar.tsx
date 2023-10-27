import currentUser from "@/hooks/current-user";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export async function MainNewsfeedSidebar() {
  const user = await currentUser();
  if (!user) redirect("/login");

  return (
    <Card className="sticky top-24">
      <CardContent className="px-2 py-3">
        <div className="max-w-[520px] min-w-[300px]">
          <div>
            <Link href={`/${user.id}`}>
              <Button variant="ghost" className="w-full h-auto justify-start">
                <Avatar className="mr-4">
                  <AvatarImage
                    src={user.profileImageUrl as string}
                    alt={`Profile Image of ${user.firstName} ${user.lastName}`}
                  />
                  <AvatarFallback className="uppercase">
                    {user.firstName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                {user.firstName} {user.lastName}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
