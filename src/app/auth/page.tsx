"use client";

import Link from "next/link";


export default function AuthPage() {


  return (


    <main className="
      min-h-screen
      bg-gray-100
      flex
      items-center
      justify-center
      px-6
    ">


      <div className="
        bg-white
        shadow-xl
        rounded-3xl
        p-10
        w-full
        max-w-md
      ">



        <div className="text-center">


          <h1 className="
            text-4xl
            font-black
          ">

            THE ECHO

          </h1>



          <p className="
            text-gray-500
            mt-3
          ">

            Echoing Reality of Thousands...

          </p>



        </div>







        <div className="
          mt-10
          space-y-5
        ">



          <Link

            href="/login"

            className="
              block
              w-full
              text-center
              bg-black
              text-white
              py-4
              rounded-xl
              font-semibold
              hover:bg-gray-800
              transition
            "

          >

            Login

          </Link>








          <Link

            href="/auth/register"

            className="
              block
              w-full
              text-center
              border-2
              border-black
              py-4
              rounded-xl
              font-semibold
              hover:bg-gray-100
              transition
            "

          >

            Create Reader Account

          </Link>








          <Link

            href="/auth/writer/login"

            className="
              block
              w-full
              text-center
              border
              py-4
              rounded-xl
              font-semibold
              hover:bg-gray-100
              transition
            "

          >

            Writer Access

          </Link>





        </div>








        <p className="
          text-center
          text-sm
          text-gray-500
          mt-8
        ">

          Join The Echo community and share stories that matter.

        </p>





      </div>



    </main>


  );

}