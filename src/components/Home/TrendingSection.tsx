"use client";

import Link from "next/link";

export default function TrendingSection({
  articles,
}: {
  articles: any[];
}) {
  if (!articles?.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4">
        Trending
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {articles.slice(0, 6).map((a) => (
          <Link
            key={a.id}
            href={`/articles/${a.slug}`}
            className="border p-4 rounded hover:shadow"
          >
            <h3 className="font-bold">{a.title}</h3>
            <p className="text-sm text-gray-600">
              {a.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}