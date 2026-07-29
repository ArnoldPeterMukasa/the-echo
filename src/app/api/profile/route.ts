import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

import { connectDB } from "@/src/lib/mongodb";
import User from "@/src/models/User";
import { authOptions } from "@/src/lib/auth";


export async function GET() {

  try {

    const session =
      await getServerSession(authOptions);


    if(!session?.user?.email){

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


    const user =
      await User.findOne({
        email:session.user.email
      })
      .select("-password");


    return NextResponse.json(user);



  } catch(error){

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





export async function PUT(
  request:Request
){

  try {


    const session =
      await getServerSession(authOptions);



    if(!session?.user?.email){

      return NextResponse.json(
        {
          message:"Unauthorized"
        },
        {
          status:401
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
      currentPassword,
      newPassword
    } = body;



    await connectDB();



    const user =
      await User.findOne({
        email:session.user.email
      });



    if(!user){

      return NextResponse.json(
        {
          message:"User not found"
        },
        {
          status:404
        }
      );

    }





    // PASSWORD CHANGE

    if(newPassword){


      if(!currentPassword){

        return NextResponse.json(
          {
            message:"Current password required"
          },
          {
            status:400
          }
        );

      }



      const match =
        await bcrypt.compare(
          currentPassword,
          user.password
        );



      if(!match){

        return NextResponse.json(
          {
            message:"Current password incorrect"
          },
          {
            status:400
          }
        );

      }



      const validPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;



      if(!validPassword.test(newPassword)){


        return NextResponse.json(
          {
            message:
            "Password must contain uppercase, lowercase and number"
          },
          {
            status:400
          }
        );


      }



      user.password =
        await bcrypt.hash(
          newPassword,
          10
        );


    }




    user.firstName =
      firstName ?? user.firstName;


    user.lastName =
      lastName ?? user.lastName;


    user.bio =
      bio ?? user.bio;


    user.image =
      image ?? user.image;



    await user.save();



    const safeUser =
      await User.findById(user._id)
      .select("-password");



    return NextResponse.json(
      safeUser
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