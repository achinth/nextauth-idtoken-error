import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import FacebookProvider from 'next-auth/providers/facebook';

export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
      idToken: true,
    }),
  ],
  callbacks: {
    jwt: async ({ account, token, user }) => {
      if (account) {
        console.log('account:', account);
      }
      return { ...token, ...user };
    },

    session: async ({ session }) => {
      return session;
    },

    signIn: async ({ profile }) => {
      console.log('profile:', profile);
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
