import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/src/lib/mongodb";
import User from "@/src/models/User";
import bcrypt from "bcryptjs";


export const authOptions = {

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



        const passwordMatch =
          await bcrypt.compare(

            credentials.password,

            user.password

          );



        if (!passwordMatch) {

          return null;

        }



        return {

          id: user._id.toString(),

          name:
            `${user.firstName} ${user.lastName}`,

          email: user.email,

          role: user.role,

        };


      },

    }),

  ],



  pages: {

    signIn: "/login",

  },



  callbacks: {


    async jwt({ token, user }: any) {


      if (user) {

        token.id = user.id;

        token.role = user.role;

      }


      return token;

    },



    async session({ session, token }: any) {


      if (session.user) {


        session.user.id = token.id;

        session.user.role = token.role;


      }


      return session;

    },


  },



  secret: process.env.NEXTAUTH_SECRET,

};