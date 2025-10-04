import { betterFetch } from "@better-fetch/fetch";
import type { authClient } from "@/lib/auth-client";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof authClient.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define routes - using dynamic workspace slug pattern
  const defaultWorkspace = "as"; // or get from env/config
  const dashboardRoute = `/${defaultWorkspace}/dashboard`;

  // Check if current path is a protected route (workspace-based routes)
  // Pattern: /[workspaceSlug]/... where workspaceSlug is any string
  // This protects all routes under any workspace (excluding public routes like /sign-up)
  const workspaceRoutePattern = /^\/[^\/]+\/(?!$)/; // Matches /workspace/anything but not just /workspace
  const isPublicRoute = pathname === "/" || pathname === "/sign-up";
  const isProtectedRoute =
    workspaceRoutePattern.test(pathname) && !isPublicRoute;

  try {
    // Get session
    const { data: session } = await betterFetch<Session>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    console.log("Middleware - Path:", pathname, "Session exists:", !!session);

    // If no session
    if (!session) {
      // If trying to access protected route, redirect to login
      if (isProtectedRoute) {
        console.log("No session, redirecting to login");
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Allow access to public routes
      return NextResponse.next();
    }

    // If session exists
    // If on login page ("/"), redirect to dashboard
    if (pathname === "/") {
      console.log("Session exists, redirecting to dashboard");
      return NextResponse.redirect(new URL(dashboardRoute, request.url));
    }

    // Allow access to all other routes when authenticated
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);

    // On error, treat as no session
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * This prevents redirect loops by not matching on internal Next.js routes
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
