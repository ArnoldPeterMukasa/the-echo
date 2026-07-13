"use client";

import Link from "next/link";

export default function CoverPage() {

  const coverImage = "";

  return (

    <main className="relative min-h-screen overflow-hidden bg-black text-white">


      {/* COVER IMAGE */}
      {coverImage ? (

        <img
          src={coverImage}
          alt="The Echo Cover"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            opacity-50
          "
        />

      ) : (

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-yellow-500
            via-black
            to-black
          "
        />

      )}



      {/* DARK OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-black/50
        "
      />



      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          flex-col
          justify-center
          items-center
          text-center
          px-6
        "
      >


        <p
          className="
            text-yellow-400
            tracking-[0.5em]
            uppercase
            text-sm
          "
        >
          Uganda's Student Magazine
        </p>



        <h1
          className="
            mt-4
            text-6xl
            md:text-8xl
            font-black
            tracking-tight
          "
        >
          THE ECHO
        </h1>



        <p
          className="
            mt-6
            max-w-2xl
            text-lg
            text-gray-200
          "
        >
          Stories. Innovation. Leadership. Culture.
          Voices that matter.
        </p>



        <p className="mt-4 text-gray-300">
          Issue 01 • July Edition
        </p>



        <Link
          href="/home"
          className="
            mt-10
            bg-yellow-400
            text-black
            px-8
            py-4
            rounded-full
            font-bold
            hover:bg-yellow-300
            transition
          "
        >
          Enter Magazine →
        </Link>


      </div>


    </main>

  );
}