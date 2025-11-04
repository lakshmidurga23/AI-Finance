import { authMiddleware } from "@clerk/nextjs";
import arcjet, { shield } from "@arcjet/next";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"], // anyone can access these
  afterAuth(auth, req, evt) {
    // Optional: Arcjet can be run after Clerk
    const aj = arcjet({
      rules: [
        shield({
          mode: "DRY_RUN", // Change from "DRY_RUN" to disable warnings
        }),
      ],
    });
    return aj(req, evt);
  },
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
  runtime: "nodejs", // prevents the 1MB Edge Function error
};
