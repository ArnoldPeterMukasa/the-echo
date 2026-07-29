import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import Article from "@/src/models/Article";



export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    await connectDB();

    const { id } = await params;


    const article =
      await Article.findById(id)
      .populate(
        "author",
        "firstName lastName image"
      );


    if (!article) {

      return NextResponse.json(
        {
          message: "Article not found",
        },
        {
          status: 404,
        }
      );

    }


    return NextResponse.json(article);


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







export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {


  try {


    await connectDB();


    const { id } = await params;


    const body = await request.json();



    const updatedArticle =
      await Article.findByIdAndUpdate(

        id,

        {

          title: body.title,

          excerpt: body.excerpt,

          content: body.content,

          category: body.category,

          coverImage: body.coverImage,

          status: body.status,

        },


        {
          new:true,
        }

      );



    if(!updatedArticle){


      return NextResponse.json(

        {
          message:"Article not found",
        },

        {
          status:404,
        }

      );


    }



    return NextResponse.json(updatedArticle);



  } catch(error){


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









export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {


  try {


    await connectDB();


    const { id } = await params;



    const deletedArticle =
      await Article.findByIdAndDelete(id);



    if(!deletedArticle){


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
        success:true,
      }

    );



  } catch(error){


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