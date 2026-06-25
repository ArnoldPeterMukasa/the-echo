"use client";

import Link from "next/link";

type Props = {
  articles: any[];
};

export default function LatestSection({ articles }: Props) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mb-16">

      <h2 className="text-2xl font-semibold mb-6">
        Latest Articles
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="border rounded-lg p-5 hover:shadow-md transition"
          >

            <p className="text-xs text-gray-500 uppercase mb-2">
              {article.category}
            </p>

            <h3 className="text-xl font-bold">
              {article.title}
            </h3>

            <p className="text-gray-600 mt-2">
              {article.excerpt}
            </p>

            <p className="text-xs text-gray-400 mt-3">
              {article.author} • {article.createdAt}
            </p>

          </Link>
        ))}

      </div>
    </section>
  );
}