"use client";

import Link from "next/link";

export default function HeroSection({ featured }: { featured: any }) {
  if (!featured) return null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

      {/* IMAGE */}
      <div className="order-1 lg:order-1">
        {featured.coverImage && (
          <img
            src={featured.coverImage}
            className="w-full h-60 sm:h-80 lg:h-[340px] object-cover rounded-xl"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="order-2 space-y-4">

        <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
          {featured.category}
        </p>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
          {featured.title}
        </h1>

        <p className="text-sm sm:text-base text-gray-600">
          {featured.excerpt}
        </p>

        <Link
          href={`/articles/${featured.slug}`}
          className="inline-block px-5 py-2 bg-black text-white rounded text-sm sm:text-base"
        >
          Read Story
        </Link>
      </div>

    </section>
  );
}