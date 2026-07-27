"use client";

import Link from "next/link";
import { useState } from "react";
import {signIn} from "next-auth/react";

export default function WriterLoginPage() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const login = async()=>{
    await signIn(
      "credentials",
      {
        email,
        password,
        callbackUrl:"/dashboard/",
      }
    );
  };

  return (

    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-6">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-black text-center">
          Writer Login
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Sign in to your writer account.
        </p>


        {/* EMAIL */}

        <div className="relative mb-6">

          <input

            id="email"

            type="email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}


            className="
              peer
              w-full
              rounded-xl
              border
              px-4
              py-3
              outline-none
              focus:border-black
            "

          />

          <label

            htmlFor="email"

            className="
              absolute
              left-3
              -top-2
              bg-white
              px-2
              text-sm
              text-gray-500
              peer-focus:text-black
            "

          >

            Email <span className="text-red-600">*</span>

          </label>

        </div>



        {/* PASSWORD */}

        <div className="relative mb-6">

          <input

            id="password"

            type={showPassword ? "text" : "password"}

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            className="
              peer
              w-full
              border
              rounded-xl
              px-4
              pt-6
              pb-2
              pr-14
              outline-none
              focus:border-black
            "

          />

          <label

            htmlFor="password"

            className="
              absolute
              -top-2
              left-3
              bg-white
              px-2
              text-sm
              text-gray-500
              peer-focus:text-black
            "

          >

            Password <span className="text-red-600">*</span>

          </label>



          <button

            type="button"

            onClick={()=>setShowPassword(!showPassword)}

            className="
              absolute
              right-4
              top-4
              text-sm
              text-gray-600
            "

          >

            {showPassword ? "🙈" : "👁"}

          </button>

        </div>



        <button

          onClick={login}

          className="
            w-full
            bg-black
            text-white
            py-3
            rounded-xl
            font-semibold
          "

        >

          Login

        </button>



        <p className="text-center text-gray-500 mt-8">

          Don't have an account?{" "}

          <Link

            href="/auth/writer/signup"

            className="font-semibold text-black"

          >

            Sign Up

          </Link>

        </p>



        <p className="text-center mt-6">

          <Link

            href="/auth"

            className="text-sm text-gray-500"

          >

            ← Back

          </Link>

        </p>

      </div>

    </main>

  );

}