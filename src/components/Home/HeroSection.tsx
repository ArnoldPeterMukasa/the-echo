"use client";

import Link from "next/link";

type Props = {
  featured: any | null;
};

export default function HeroSection({ featured }: Props) {
  if (!featured) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-xl">
        <p className="text-gray-500">No featured article yet</p>
      </div>
    );
  }

  return (
    <section className="relative w-full h-[500px] rounded-xl overflow-hidden">

      {/* IMAGE */}
      {featured.coverImage && (
        <img
          src={featured.coverImage}
          alt={featured.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-10 text-white">

        {/* CATEGORY */}
        <span className="text-xs uppercase bg-white/20 px-3 py-1 rounded-full w-fit mb-3">
          {featured.category}
        </span>

        {/* TITLE */}
        <h1 className="text-2xl sm:text-4xl font-bold leading-tight max-w-2xl">
          {featured.title}
        </h1>

        {/* EXCERPT */}
        <p className="text-sm sm:text-base text-gray-200 mt-3 max-w-xl">
          {featured.excerpt}
        </p>

        {/* CTA */}
        <Link
          href={`/articles/${featured.slug}`}
          className="mt-5 inline-block bg-white text-black px-5 py-2 rounded-lg font-medium w-fit"
        >
          Read Article →
        </Link>

      </div>
    </section>
  );
}