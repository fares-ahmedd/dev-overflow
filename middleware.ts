import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhook",
  "/question/:id",
  "/tags",
  "/tags/:id",
  "/profile/:id",
  "/community",
  "/jobs",
]);

// Define ignored routes
const isIgnoredRoute = createRouteMatcher(["/api/webhook", "/api/chatgpt"]);

export default clerkMiddleware(async (auth: any, req) => {
  if (isIgnoredRoute(req)) {
    return; // Skip authentication for ignored routes
  }

  if (!isPublicRoute(req)) {
    await auth().protect(); // Protect non-public routes
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
