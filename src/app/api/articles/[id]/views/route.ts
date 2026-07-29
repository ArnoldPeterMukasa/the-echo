import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import Article from "@/src/models/Article";


export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    await connectDB();


    const { id } = await params;



    const article =
      await Article.findByIdAndUpdate(

        id,

        {
          $inc: {
            views: 1,
          },
        },

        {
          new: true,
        }

      );



    if (!article) {

      return NextResponse.json(

        {
          message:"Article not found",
        },

        {
          status:404,
        }

      );

    }



    return NextResponse.json(

      {
        views: article.views,
      }

    );



  } catch(error) {


    console.error(error);


    return NextResponse.json(

      {
        message:"Server error",
      },

      {
        status:500,
      }

    );

  }

}