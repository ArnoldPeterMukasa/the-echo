import { withAuth } from "next-auth/middleware";



export default withAuth(


  function proxy(req) {


    const token = req.nextauth.token;


    const pathname =
      req.nextUrl.pathname;



    // Protect admin dashboard

    if (

      pathname.startsWith("/dashboard/admin")

    ) {


      if (

        token?.role !== "admin"

      ) {


        return Response.redirect(

          new URL(
            "/dashboard",
            req.url
          )

        );


      }


    }



  },


  {


    pages: {

      signIn:"/login",

    },


    callbacks:{


      authorized({ token }) {


        return !!token;


      },


    },


  }


);






export const config = {


  matcher:[


    "/dashboard/:path*",


  ],


};