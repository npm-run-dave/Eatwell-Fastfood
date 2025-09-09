// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const url = req.nextUrl.clone();

  if (token && url.pathname === "/Login") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Optionally, protect other pages, e.g., /dashboard
  // if (!token && url.pathname.startsWith("/dashboard")) {
  //   url.pathname = "/Login";
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Login"], 
};
