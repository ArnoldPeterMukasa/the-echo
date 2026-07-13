"use client";

import Link from "next/link";

type Props = {
  featured: any;
};

export default function FeaturedSection({ featured }: Props) {
  if (!featured) return null;

  return (
    <section className="mb-12">

      <p className="text-sm text-gray-500 uppercase">
        Featured Story
      </p>

      <Link href={`/articles/${featured.slug}`}>
        <h1 className="text-5xl font-bold mt-2 hover:underline">
          {featured.title}
        </h1>
      </Link>

      <p className="text-gray-600 mt-4 text-lg max-w-2xl">
        {featured.summary}
      </p>

      <p className="text-sm text-gray-400 mt-2">
        By {featured.author} • {featured.createdAt}
      </p>

    </section>
  );
}