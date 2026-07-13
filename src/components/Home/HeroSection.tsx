"use client";

import Link from "next/link";

type Props = {
  featured: any;
};

export default function HeroSection({ featured }: Props) {

  if (!featured) {
    return null;
  }


  return (
    <section className="relative overflow-hidden rounded-3xl h-[650px] bg-black">


      {/* COVER IMAGE */}
      {featured.coverImage ? (
        <img
          src={featured.coverImage}
          alt={featured.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-black to-black" />
      )}



      {/* MAGAZINE OVERLAY */}
      <div className="
        absolute 
        inset-0 
        bg-gradient-to-r 
        from-black 
        via-black/80 
        to-black/20
      " />



      {/* CONTENT */}
      <div className="
        relative 
        z-10 
        flex 
        flex-col 
        justify-end 
        h-full 
        px-8 
        sm:px-14 
        py-14
      ">


        {/* BRAND */}
        <p className="
          uppercase 
          tracking-[0.4em] 
          text-yellow-400 
          text-sm 
          font-bold
        ">
          THE ECHO MAGAZINE
        </p>



        {/* ISSUE */}
        <p className="
          mt-2 
          text-gray-300 
          uppercase 
          text-sm
        ">
          Issue 01 • July Edition • Featured Story
        </p>



        {/* TITLE */}
        <h1 className="
          mt-5 
          max-w-4xl 
          text-4xl
          sm:text-6xl 
          lg:text-7xl 
          font-black 
          leading-tight 
          text-white
        ">
          {featured.title}
        </h1>



        {/* SUMMARY */}
        <p className="
          mt-5 
          text-lg 
          text-gray-200 
          max-w-xl
          line-clamp-3
        ">
          {featured.summary}
        </p>



        {/* ACTIONS */}
        <div className="mt-8 flex flex-wrap gap-4">


          <Link
            href={`/articles/${featured.slug}`}
            className="
              bg-yellow-400
              text-black
              px-8
              py-3
              rounded-full
              font-bold
              hover:bg-yellow-300
              transition
            "
          >
            Read Story →
          </Link>



          <span className="
            border
            border-white/60
            text-white
            px-6
            py-3
            rounded-full
          ">
            {featured.category}
          </span>


        </div>



        {/* META */}
        <div className="
          mt-10 
          flex 
          flex-wrap 
          gap-6 
          text-sm 
          text-gray-300
        ">

          <span>
            By <strong>{featured.author}</strong>
          </span>


          <span>
            {featured.views || 0} Views
          </span>


          <span>
            {featured.createdAt}
          </span>


        </div>


      </div>


    </section>
  );
}