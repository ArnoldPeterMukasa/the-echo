import { NextResponse } from "next/server";


export async function POST(
  request: Request
) {

  try {


    const body =
      await request.json();



    const {
      image,
      email,
    } = body;



    if (
      !image ||
      !email
    ) {

      return NextResponse.json(

        {
          message:
            "Missing image or email",
        },

        {
          status:400,
        }

      );

    }



    const { connectDB } =
      await import(
        "@/src/lib/mongodb"
      );


    const User =
      (await import(
        "@/src/models/User"
      )).default;



    await connectDB();



    await User.findOneAndUpdate(

      {
        email,
      },

      {
        image,
      }

    );



    return NextResponse.json(

      {
        message:
          "Profile photo updated",
      }

    );



  } catch(error) {


    console.error(error);



    return NextResponse.json(

      {
        message:
          "Upload failed",
      },

      {
        status:500,
      }

    );


  }


}