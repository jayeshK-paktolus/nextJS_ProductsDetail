import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession`
   * and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession['user'];
    accessToken: string;
    refreshToken: string;
  }

  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken: string;
  }
}