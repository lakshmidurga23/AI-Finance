import { clerkMiddleware } from "@clerk/nextjs/server";
import arcjet, { shield } from "@arcjet/next";
import { NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE",
      // customize if needed
    }),
  ],
});

export default clerkMiddleware(async (auth, req) => {
  await aj.protect(req);
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
