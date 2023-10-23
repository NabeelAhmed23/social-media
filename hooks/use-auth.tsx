import { cookies } from "next/headers";

export default function useAuth() {
  const cookieStore: any = cookies();
  const auth = cookieStore.get("x-auth-token");
  return auth ?? null;
}
