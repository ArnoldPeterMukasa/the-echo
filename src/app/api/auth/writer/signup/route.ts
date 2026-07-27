import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/src/lib/mongodb";
import User from "@/src/models/User";


export async function POST(
  request: Request
) {

  try {

    const body = await request.json();


    const {
      firstName,
      lastName,
      email,
      password,
    } = body;



    if (
      !firstName ||
      !lastName ||
      !email ||
      !password
    ) {

      return NextResponse.json(
        {
          message:
            "All fields are required",
        },
        {
          status: 400,
        }
      );

    }



    await connectDB();



    const existingUser =
      await User.findOne({
        email,
      });



    if (existingUser) {

      return NextResponse.json(
        {
          message:
            "Email already exists",
        },
        {
          status: 400,
        }
      );

    }



    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );



    const user =
      await User.create({

        firstName,

        lastName,

        email,

        password:
          hashedPassword,

        role:
          "writer",

      });



    return NextResponse.json(
      {
        message:
          "Account created successfully",

        userId:
          user._id,

      },
      {
        status: 201,
      }
    );


  } catch(error) {


    console.error(error);


    return NextResponse.json(
      {
        message:
          "Server error",
      },
      {
        status: 500,
      }
    );


  }

}