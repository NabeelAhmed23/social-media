import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  let token = req.cookies.has("x-auth-token");
  if (req.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (req.nextUrl.pathname !== "/login" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|robots.txt|public|images|manifest.json|sw.js|favicon.ico|workbox-*).*)",
  ],
};
