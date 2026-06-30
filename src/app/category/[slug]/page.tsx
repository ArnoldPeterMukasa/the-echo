"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useArticleStore } from "@/src/store/articleStore";

export default function CategoryPage() {
  const { slug } = useParams();
  const { articles } = useArticleStore();

  const filtered = articles.filter(
    (a) =>
      a.status === "published" &&
      a.category?.toLowerCase() === String(slug).toLowerCase()
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

      {/* HEADER */}
      <h1 className="text-2xl sm:text-4xl font-bold capitalize mb-8">
        {slug} Stories
      </h1>

      {/* GRID */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No articles found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="border rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              {article.coverImage && (
                <img
                  src={article.coverImage}
                  className="w-full h-40 object-cover"
                />
              )}

              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase">
                  {article.category}
                </p>

                <h2 className="font-bold text-lg mt-1 line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

    </main>
  );
}