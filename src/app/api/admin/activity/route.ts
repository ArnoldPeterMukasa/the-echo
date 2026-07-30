import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { connectDB } from "@/src/lib/mongodb";
import { authOptions } from "@/src/lib/auth";
import AdminActivity from "@/src/models/AdminActivity";


export async function GET(){

  try{


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




    const logs =
      await AdminActivity.find()

      .populate(
        "admin",
        "firstName lastName email"
      )

      .populate(
        "article",
        "title slug"
      )

      .sort({
        createdAt:-1
      })

      .limit(50);






    return NextResponse.json(logs);



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