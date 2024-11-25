import backendInstance from "@/lib/backend-instance";
import { SingInFormSchema } from "@/schemas/sign-in";
import { HttpStatusCode } from "axios";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import NextAuth, { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = SingInFormSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        try {
          const {
            data: { email, password },
          } = validatedFields;

          const response = await backendInstance.post<{
            accessToken: string;
            refreshToken: string;
          }>("/auth/sign-in", {
            username: email,
            password: password,
          });

          if (response.status !== HttpStatusCode.Ok) return null;

          return {
            id: new Date().getTime().toString(),
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 15 * 60 * 60,
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user?.accessToken) token.accessToken = user.accessToken;

      return token;
    },
    session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(options);

/**
 *
 * @description This function is a wrapper around getServerSession that uses the authOptions.
 * Use this to get the access token
 */
const auth = (
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) => {
  return getServerSession(...args, options);
};

export { auth, handler as GET, handler as POST };

