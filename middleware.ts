// export { auth as middleware } from "@/auth";

import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const isProtectedRoute = protectedRoutes.some((routes) =>
    request.nextUrl.pathname.startsWith(routes)
  );

  if (!session && isProtectedRoute) {
    const absoluteUrl = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
    return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ], // Add any other routes you want to log
};