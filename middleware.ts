import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  const protectedRoutes = [
    "/dashboard",
    "/products",
    "/sales",
    "/analytics",
    "/settings",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  //NOT LOGGED IN 
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  //ALREADY LOGGED IN 
  if (token && isAuthPage) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

// ROUTES TO PROTECT 
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/sales/:path*",
    "/analytics/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};