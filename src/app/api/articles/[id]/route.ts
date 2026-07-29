import { NextResponse } from "next/server";

import { connectDB } from "@/src/lib/mongodb";
import Article from "@/src/models/Article";



export async function PUT(

  request: Request,

  context: {
    params: Promise<{
      id: string;
    }>;
  }

) {


  try {


    await connectDB();



    const { id } = await context.params;



    const body = await request.json();



    const article =
      await Article.findByIdAndUpdate(

        id,

        {

          status: body.status,

        },

        {

          new: true,

        }

      );




    if (!article) {


      return NextResponse.json(

        {
          message:
            "Article not found",
        },

        {
          status:404,
        }

      );


    }




    return NextResponse.json(article);



  } catch(error){


    console.error(error);



    return NextResponse.json(

      {
        message:
          "Server error",
      },

      {
        status:500,
      }

    );


  }


}








export async function DELETE(

  request: Request,

  context: {
    params: Promise<{
      id: string;
    }>;
  }

) {


  try {


    await connectDB();



    const { id } =
      await context.params;




    const article =
      await Article.findByIdAndDelete(id);





    if(!article){


      return NextResponse.json(

        {
          message:
            "Article not found",
        },

        {
          status:404,
        }

      );


    }




    return NextResponse.json(

      {
        message:
          "Article deleted successfully",
      }

    );




  } catch(error){


    console.error(error);



    return NextResponse.json(

      {
        message:
          "Server error",
      },

      {
        status:500,
      }

    );


  }


}