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



      {/* DARK CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />



      {/* COVER CONTENT */}
      <div
        className="
          relative
          z-10
          min-h-screen
          flex
          flex-col
          justify-center
          items-center
          text-center
          px-6
        "
      >


        {/* TOP LABEL */}
        <p
          className="
            uppercase
            tracking-[0.5em]
            text-yellow-400
            text-sm
            font-bold
          "
        >
          Uganda's Student Magazine
        </p>



        {/* TITLE */}
        <h1
          className="
            mt-5
            text-7xl
            md:text-9xl
            font-black
            tracking-tight
          "
        >
          THE ECHO
        </h1>



        {/* ISSUE */}
        <div
          className="
            mt-6
            border
            border-yellow-400
            px-5
            py-2
            rounded-full
            text-yellow-400
            uppercase
            text-sm
            tracking-widest
          "
        >
          Issue 01 • July Edition
        </div>



        {/* COVER HEADLINES */}
        <div className="mt-8 space-y-2 text-gray-200">

          <p className="text-xl font-semibold">
            Stories. Innovation. Leadership.
          </p>

          <p className="text-gray-300">
            Culture • Voices • Ideas that matter
          </p>

        </div>



        {/* ENTER */}
        <Link
          href="/"
          className="
            mt-12
            bg-yellow-400
            text-black
            px-10
            py-4
            rounded-full
            font-black
            hover:bg-yellow-300
            transition
          "
        >
          Enter Magazine →
        </Link>



        {/* FOOTER STYLE TEXT */}
        <p className="
          absolute
          bottom-8
          text-xs
          uppercase
          tracking-[0.4em]
          text-gray-400
        ">
          The Echo • Echoing Reality of Thousands
        </p>


      </div>


    </main>
  );
}