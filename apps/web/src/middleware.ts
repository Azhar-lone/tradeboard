import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routes } from "./constants/routes"; // assuming routes are defined in this file

export function middleware(request: NextRequest) {
  const token = request.cookies.get("login")?.value;
  const pathname = request.nextUrl.pathname;

  // If user is logged in, prevent access to the /login page and redirect to /dashboard
  if (pathname === routes.login && token) {
    const redirectUrl = new URL(routes.dashboard, request.url); // Redirect logged-in user from /login to /dashboard
    return NextResponse.redirect(redirectUrl);
  }

  // If user is logged in and visits the root '/', redirect to /dashboard
  if (pathname === "/" && token) {
    const redirectUrl = new URL(routes.dashboard, request.url); 
    return NextResponse.redirect(redirectUrl);
  }

  // Allow access to /login for logged-out users
  if (pathname === routes.login && !token) {
    return NextResponse.next();
  }

  // For all other routes, require authentication
  if (!token) {
    const loginUrl = new URL(routes.login, request.url); // Redirect logged-out users to /login
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|static|styles|fonts).*)'], // Exclude Next.js internals and static assets
};
