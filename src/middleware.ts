import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    // Custom logic if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only require auth for /admin routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"], // Only match /admin routes
};
