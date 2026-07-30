import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { connectDB } from "@/src/lib/mongodb";
import Article from "@/src/models/Article";
import { authOptions } from "@/src/lib/auth";



export async function POST(request: Request) {


  try {


    const session =
      await getServerSession(authOptions);



    if(!session?.user?.id){


      return NextResponse.json(
        {
          message:"Unauthorized"
        },
        {
          status:401
        }
      );


    }





    await connectDB();



    const body =
      await request.json();





    const article =
      await Article.create({

        title:body.title,


        slug:
          body.title
          .toLowerCase()
          .replace(/\s+/g,"-")
          .replace(/[^\w-]+/g,""),



        excerpt:
          body.excerpt,


        content:
          body.content,


        coverImage:
          body.coverImage,


        category:
          body.category,



        // writers submit for review
        status:
          session.user.role === "admin"
          ? "published"
          : "pending",



        author:
          session.user.id,


      });





    return NextResponse.json(
      article,
      {
        status:201
      }
    );



  }catch(error){


    console.error(error);



    return NextResponse.json(
      {
        message:"Server Error"
      },
      {
        status:500
      }
    );


  }


}








export async function GET(){


  try{


    await connectDB();




    const articles =
      await Article.find({

        status:"published"

      })

      .populate(
        "author",
        "firstName lastName image"
      )

      .sort({

        createdAt:-1

      });





    return NextResponse.json(
      articles
    );



  }catch(error){


    console.error(error);



    return NextResponse.json(
      {
        message:"Server Error"
      },
      {
        status:500
      }
    );


  }


}