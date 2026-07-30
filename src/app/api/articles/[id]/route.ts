import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { connectDB } from "@/src/lib/mongodb";
import Article from "@/src/models/Article";
import AdminActivity from "@/src/models/AdminActivity";
import { authOptions } from "@/src/lib/auth";







export async function GET(
  request: Request,
  { params }: { params: Promise<{ id:string }> }
) {


  try {


    await connectDB();


    const { id } =
      await params;



    const article =
      await Article.findById(id)
      .populate(
        "author",
        "firstName lastName image"
      );



    if(!article){


      return NextResponse.json(
        {
          message:"Article not found"
        },
        {
          status:404
        }
      );


    }



    return NextResponse.json(article);



  }catch(error){


    console.error(error);



    return NextResponse.json(
      {
        message:"Server error"
      },
      {
        status:500
      }
    );


  }


}









export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id:string }> }
) {



  try {



    const session =
      await getServerSession(authOptions);



    if(
      !session?.user ||
      session.user.role !== "admin"
    ){


      return NextResponse.json(
        {
          message:"Forbidden"
        },
        {
          status:403
        }
      );


    }





    await connectDB();




    const { id } =
      await params;



    const body =
      await request.json();






    const updatedArticle =
      await Article.findByIdAndUpdate(

        id,

        {

          title:
            body.title,

          excerpt:
            body.excerpt,

          content:
            body.content,

          category:
            body.category,

          coverImage:
            body.coverImage,

          status:
            body.status,


        },


        {
          new:true
        }

      );






    if(!updatedArticle){


      return NextResponse.json(
        {
          message:"Article not found"
        },
        {
          status:404
        }
      );


    }





    await AdminActivity.create({

      admin:
        session.user.id,


      article:
        updatedArticle._id,


      action:
        body.status === "published"
        ? "PUBLISHED_ARTICLE"
        : body.status === "draft"
        ? "SENT_BACK_ARTICLE"
        : "UPDATED_ARTICLE",


      details:
        `${session.user.name} changed "${updatedArticle.title}" status to ${body.status}`,

    });







    return NextResponse.json(
      updatedArticle
    );






  }catch(error){


    console.error(error);



    return NextResponse.json(
      {
        message:"Server error"
      },
      {
        status:500
      }
    );


  }


}









export async function DELETE(
  request:Request,
  { params }: { params:Promise<{id:string}> }
){



  try {



    const session =
      await getServerSession(authOptions);




    if(
      !session?.user ||
      session.user.role !== "admin"
    ){


      return NextResponse.json(
        {
          message:"Forbidden"
        },
        {
          status:403
        }
      );


    }





    await connectDB();





    const { id } =
      await params;






    const deletedArticle =
      await Article.findByIdAndDelete(id);





    if(!deletedArticle){


      return NextResponse.json(
        {
          message:"Article not found"
        },
        {
          status:404
        }
      );


    }







    await AdminActivity.create({

      admin:
        session.user.id,


      article:
        deletedArticle._id,


      action:
        "DELETED_ARTICLE",


      details:
        `${session.user.name} deleted "${deletedArticle.title}"`,

    });







    return NextResponse.json(
      {
        success:true
      }
    );






  }catch(error){


    console.error(error);



    return NextResponse.json(
      {
        message:"Server error"
      },
      {
        status:500
      }
    );


  }


}