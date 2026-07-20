import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({

  providers: [

    CredentialsProvider({

      name: "Echo Login",

      credentials: {

        email:{
          label:"Email",
          type:"email",
        },

        password:{
          label:"Password",
          type:"password",
        }

      },


      async authorize(credentials){

        if(
          !credentials?.email ||
          !credentials?.password
        ){
          return null;
        }


        const users = [

          {
            id:"1",
            name:"Echo Admin",
            email:
              process.env.THE_ECHO_ADMIN_EMAIL,
            password:
              process.env.THE_ECHO_ADMIN_PASSWORD,
            role:"admin",
          },


          {
            id:"2",
            name:"Student Writer",
            email:
              process.env.THE_ECHO_WRITER_EMAIL,
            password:
              process.env.THE_ECHO_WRITER_PASSWORD,
            role:"writer",
          }

        ];



        const user = users.find(
          (u)=>
            u.email === credentials.email &&
            u.password === credentials.password
        );



        if(!user){
          return null;
        }



        return {

          id:user.id,
          name:user.name,
          email:user.email,
          role:user.role,

        };


      }

    })

  ],



  pages:{

    signIn:"/login"

  },



  secret:process.env.NEXTAUTH_SECRET,


});


export {
  handler as GET,
  handler as POST
};