"use client";

import Link from "next/link";

export default function HeroSection({
  featured,
}: {
  featured: any;
}) {
  if (!featured) return null;

  return (
    <section className="grid md:grid-cols-2 gap-10 mb-12">

      {/* LEFT MAIN FEATURED */}
      <div className="space-y-4">

        {featured.coverImage && (
          <img
            src={featured.coverImage}
            className="w-full h-[320px] object-cover rounded-xl"
          />
        )}

        <p className="text-sm text-gray-500 uppercase">
          {featured.category}
        </p>

        <h1 className="text-4xl font-bold leading-tight">
          {featured.title}
        </h1>

        <p className="text-gray-600">
          {featured.excerpt}
        </p>

        <Link
          href={`/articles/${featured.slug}`}
          className="inline-block mt-2 px-5 py-2 bg-black text-white rounded"
        >
          Read Full Story
        </Link>
      </div>

      {/* RIGHT SIDE PREVIEW (simple trending list) */}
      <div className="border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">
          Trending Now
        </h2>

        <div className="space-y-4">
          {featured.related?.length ? (
            featured.related.map((a: any) => (
              <Link
                key={a.id}
                href={`/articles/${a.slug}`}
                className="block hover:underline"
              >
                {a.title}
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No related articles yet
            </p>
          )}
        </div>
      </div>

    </section>
  );
} 