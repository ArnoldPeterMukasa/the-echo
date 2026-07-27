"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Header() {

  const {
    data: session,
  } = useSession();

  const [open, setOpen] = useState(false);

  const firstName =
    session?.user?.name?.split(" ")[0] || "";

  return (

    <header className="sticky top-0 bg-white border-b z-50">

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">


        <Link href="/home">

          <div>

            <h1 className="text-2xl font-bold">
              The Echo
            </h1>

            <p className="text-xs text-gray-500">
              Echoing Reality of Thousands...
            </p>

          </div>

        </Link>



        <nav className="flex items-center gap-8 text-sm font-medium">


          <Link href="/home">
            Home
          </Link>


          <Link href="/articles">
            Articles
          </Link>


          <Link href="/dashboard">
            Dashboard
          </Link>


          <Link href="/about">
            About
          </Link>


          <Link href="/contact">
            Contact
          </Link>



          {!session ? (

            <Link

              href="/auth"

              className="
                px-4
                py-2
                rounded-lg
                bg-black
                text-white
              "

            >

              Login

            </Link>

          ) : (

            <div className="relative">


              <button

                onClick={() => setOpen(!open)}

                className="
                  flex
                  items-center
                  gap-3
                "

              >


                <div
                  className="
                    w-10
                    h-10
                    rounded-full
                    bg-black
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                  "
                >

                  {firstName.charAt(0).toUpperCase()}

                </div>


                <span className="font-semibold">

                  {firstName}

                </span>


                <span>

                  ▼

                </span>


              </button>



              {open && (

                <div
                  className="
                    absolute
                    right-0
                    mt-3
                    w-56
                    bg-white
                    border
                    rounded-xl
                    shadow-lg
                    overflow-hidden
                  "
                >


                  <div className="px-4 py-3 border-b">

                    <p className="font-semibold">

                      {session.user.name}

                    </p>

                    <p className="text-xs text-gray-500">

                      {session.user.email}

                    </p>

                    <p className="text-xs text-gray-400 capitalize mt-1">

                      {session.user.role}

                    </p>

                  </div>



                  <Link

                    href="/profile"

                    onClick={() => setOpen(false)}

                    className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-3
                      hover:bg-gray-100
                    "

                  >

                    👤 Edit Profile

                  </Link>



                  <button

                    onClick={() =>
                      signOut({
                        callbackUrl: "/home",
                      })
                    }

                    className="
                      w-full
                      text-left
                      flex
                      items-center
                      gap-2
                      px-4
                      py-3
                      hover:bg-red-50
                      text-red-600
                    "

                  >

                    🚪 Logout

                  </button>


                </div>

              )}


            </div>

          )}


        </nav>


      </div>

    </header>

  );

}