// import { NextRequest, NextResponse } from "next/server";
// import { verifyToken } from "@/models/auth";

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Skip public routes
//   const publicPaths = ["/login", "/register", "/", "/favicon.ico"];
//   if (publicPaths.some((path) => pathname.startsWith(path))) {
//     return NextResponse.next();
//   }

//   // Get token from cookies
//   const token = req.cookies.get("token")?.value;
//   if (!token) {
//     // Redirect to login if no token
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     // Verify JWT
//     const payload = verifyToken(token) as any;

//     // Pass user ID to downstream requests via response header
//     const response = NextResponse.next();
//     response.headers.set("x-user-id", payload.id);
//     return response;
//   } catch (err) {
//     console.error("JWT verification failed:", err);
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/api/:path*"],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get(
      "admin-token"
    )?.value;

  const isAdminRoute =
    request.nextUrl.pathname.startsWith(
      "/admin/dashboard"
    );

  const isAdminLogin =
    request.nextUrl.pathname.startsWith(
      "/admin/login"
    );

  /* ================= ADMIN ROUTE ================= */

  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(
        new URL(
          "/admin/login",
          request.url
        )
      );
    }

    try {
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

    } catch {
      return NextResponse.redirect(
        new URL(
          "/admin/login",
          request.url
        )
      );
    }
  }

  /* ================= ALREADY LOGGED IN ================= */

  if (isAdminLogin && token) {
    return NextResponse.redirect(
      new URL(
        "/admin/dashboard",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/login",
  ],
};