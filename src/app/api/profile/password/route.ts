import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

import { connectDB } from "@/src/lib/mongodb";
import User from "@/src/models/User";
import { authOptions } from "@/src/lib/auth";


export async function PUT(request: Request) {

  try {


    const session =
      await getServerSession(authOptions);



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




    const body =
      await request.json();



    const {
      currentPassword,
      newPassword,
    } = body;




    if (
      !currentPassword ||
      !newPassword
    ) {

      return NextResponse.json(
        {
          message: "All password fields are required",
        },
        {
          status: 400,
        }
      );

    }





    const passwordRules =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;



    if(!passwordRules.test(newPassword)){

      return NextResponse.json(
        {
          message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
        },
        {
          status:400,
        }
      );

    }






    await connectDB();




    const user =
      await User.findOne({
        email: session.user.email,
      });




    if(!user){

      return NextResponse.json(
        {
          message:"User not found",
        },
        {
          status:404,
        }
      );

    }







    const passwordMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );




    if(!passwordMatch){

      return NextResponse.json(
        {
          message:"Current password is incorrect",
        },
        {
          status:400,
        }
      );

    }







    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );




    user.password =
      hashedPassword;



    await user.save();





    return NextResponse.json(
      {
        message:"Password updated successfully",
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