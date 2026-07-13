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
    <section className="relative overflow-hidden rounded-3xl h-[650px]">


      {/* COVER/background IMAGE */}
      {featured.coverImage && (
        <img
          src={featured.coverImage}
          alt={featured.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}



      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />



      {/* MAGAZINECONTENT */}
      <div className="relative z-10 flex flex-col justify-end h-full px-8 sm:px-14 py-14">


        <p className="uppercase tracking-[0.4em] text-yellow-400 text-sm font-semibold">
          THE ECHO MAGAZINE
        </p>


        <p className="mt-2 text-gray-300 uppercase text-sm">
          Issue 01 • Featured Story
        </p>


        <h1 className="mt-5 max-w-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-white">
          {featured.title}
        </h1>



        <p className="mt-5 text-lg text-gray-200 max-w-xl">
          {featured.summary}
        </p>



        <div className="mt-8 flex gap-4">


          <Link
            href={`/articles/${featured.slug}`}
            className="bg-yellow-400 text-black px-8 py-3rounded-full font-bold hover:bg-yellow-300 transition"
          >
            Read Story → 
          </Link>


          <span className="border border-white/60 text-white px-6 py-3 rounded-full">
            {featured.category}
          </span>


        </div>

        <div className="mt-10 flex flex-wrap gap-6 text-sm text-sm text-gray-300">
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