// eslint-disable-next-line no-restricted-exports
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|auth|api|_next/static|_next/image|favicon.ico).*)",
  ],
};
