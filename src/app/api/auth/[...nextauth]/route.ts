import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/src/models/User";
import { connectDB } from "@/src/lib/mongodb";
import bcrypt from "bcryptjs";

const handler = NextAuth({

  providers: [

    CredentialsProvider({

      name: "Echo Login",

      credentials: {

        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },

      },

      async authorize(credentials) {

        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }

        await connectDB();

        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
          image: user.image || null,
        };

      },

    }),

  ],

  pages: {

    signIn: "/login",

  },

  callbacks: {

    async jwt({ token, user }) {

      if (user) {

        token.id = user.id;
        token.role = user.role;
        token.picture = user.image;

      }

      return token;

    },

    async session({ session, token }) {

      if (session.user) {

        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.image = token.picture as string;

      }

      return session;

    },

  },

  secret: process.env.NEXTAUTH_SECRET,

});

export {
  handler as GET,
  handler as POST,
};