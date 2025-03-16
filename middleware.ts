import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// This is a simplified middleware that doesn't need database access
// It only verifies the token structure and expiration
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const { pathname } = request.nextUrl

  // JWT Secret - should be moved to an environment variable in production
  const JWT_SECRET = new TextEncoder().encode("your-secret-key-here")

  // Protected routes
  if (pathname.startsWith("/user") || pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      // Verify token (we don't need to check the database here)
      const { payload } = await jwtVerify(token, JWT_SECRET)

      // For admin routes, verify role
      if (pathname.startsWith("/admin") && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/user", request.url))
      }
    } catch (error) {
      // Token is invalid or expired
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Redirect authenticated users away from login/signup
  if ((pathname === "/login" || pathname === "/signup") && token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)

      if (payload.role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url))
      } else {
        return NextResponse.redirect(new URL("/user", request.url))
      }
    } catch (error) {
      // If token verification fails, allow access to login/signup
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/login", "/signup"],
}
