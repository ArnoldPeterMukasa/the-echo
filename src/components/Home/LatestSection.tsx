"use client";

import Link from "next/link";

export default function LatestSection({
  articles,
}: {
  articles: any[];
}) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4">
        Latest Articles
      </h2>

      <div className="space-y-4">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/articles/${a.slug}`}
            className="block border p-4 rounded hover:shadow"
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