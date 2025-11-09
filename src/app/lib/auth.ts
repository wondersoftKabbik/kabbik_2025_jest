import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id_token: string; // Add the custom property
  }
}

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // clientId: process.env.DUMMY_CLIENT_ID,
      // clientSecret: process.env.DUMMY_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "profile email",
          prompt: "select_account",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin

      if (account) {
        token.id_token = account.id_token;
      }
      return token;
    },

    async session({ session, token }) {
      if (typeof token.id_token === "string") {
        // Ensure that id_token is a string before assigning it to session.id_token
        session.id_token = token.id_token;
      }
      return session;
    },

    // async redirect({ url, baseUrl }) {
    //   url = "/redirecting";
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },
  },

  secret: process.env.JWT_SECRET,
});
