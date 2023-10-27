import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { db } from "@/lib/db";
import { exclude } from "@/lib/helper";

export default async function currentUser() {
  const token = cookies().get("x-auth-token") as RequestCookie;
  if (!token) return null;
  const { id } = jwt.decode(token.value) as User;
  const userObj = await db.user.findFirst({
    where: {
      id: id,
    },
  });

  const user = exclude(userObj, ["password"]) as User;

  return user;
}
