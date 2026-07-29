import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { connectDB } from "@/src/lib/mongodb";
import User from "@/src/models/User";
import { authOptions } from "@/src/lib/auth";


export async function GET() {

  try {

    const session = await getServerSession(authOptions);


    if (!session?.user?.email) {

      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }


    await connectDB();


    const user = await User.findOne({
      email: session.user.email,
    }).select("-password");


    return NextResponse.json(user);


  } catch {


    return NextResponse.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      }
    );


  }

}




export async function PUT(
  request: Request
) {

  try {


    const session =
      await getServerSession(authOptions);



    if (!session?.user?.email) {

      return NextResponse.json(
        {
          message:"Unauthorized",
        },
        {
          status:401,
        }
      );

    }



    const body =
      await request.json();



    const {
      firstName,
      lastName,
      bio,
      image,
    } = body;



    await connectDB();



    const updatedUser =
      await User.findOneAndUpdate(

        {
          email: session.user.email,
        },


        {

          ...(firstName !== undefined && {
            firstName,
          }),

          ...(lastName !== undefined && {
            lastName,
          }),

          ...(bio !== undefined && {
            bio,
          }),

          ...(image !== undefined && {
            image,
          }),

        },


        {
          new:true,
        }

      ).select("-password");



    return NextResponse.json(updatedUser);



  } catch {


    return NextResponse.json(
      {
        message:"Server Error",
      },
      {
        status:500,
      }
    );


  }

}