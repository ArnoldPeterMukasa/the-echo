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
    <section className="relative overflow-hidden rounded-3xl bg-black text-white">


      {/* COVER IMAGE */}
      {featured.coverImage && (
        <img
          src={featured.coverImage}
          alt={featured.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      )}



      {/* COLOR OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />



      {/* CONTENT */}
      <div className="relative z-10 px-6 py-16 sm:px-10 sm:py-24 max-w-3xl">


        <p className="uppercase text-sm tracking-widest text-yellow-400 mb-4">
          Featured Story
        </p>



        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
          {featured.title}
        </h1>



        <p className="mt-5 text-lg text-gray-200 max-w-xl">
          {featured.summary}
        </p>



        <div className="mt-8 flex gap-4">


          <Link
            href={`/articles/${featured.slug}`}
            className="px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300"
          >
            Read Story
          </Link>


          <span className="px-6 py-3 border border-white rounded-full">
            {featured.category}
          </span>


        </div>



      </div>


    </section>
  );
}