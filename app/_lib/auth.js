import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [Google],
  callbacks: {
    authorized({ auth, request }) {
      return auth?.user ? true : false;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getGuest(user.email);
        if (!existingUser) {
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session, user }) {
      try {
        const user = await getGuest(session.user.email);
        session.user.guestId = user.id;
        return session;
      } catch (error) {
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
});
