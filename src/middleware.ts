import { type NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line no-restricted-exports
export { default } from "next-auth/middleware";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname.startsWith("/auth")) {
    const page = pathname.split("/").at(-1);
    const email = searchParams.get("email");

    if (page === "verify" && !email) {
      return NextResponse.rewrite(
        new URL("/auth/forgot-password", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|auth|api|_next/static|_next/image|favicon.ico).*)",
    "/auth/:path*",
  ],
};
