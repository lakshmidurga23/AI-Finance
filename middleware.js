import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all routes except static assets and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
