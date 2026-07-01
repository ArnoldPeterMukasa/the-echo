"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useArticleStore } from "@/src/store/articleStore";

export default function CategoryPage() {
  const { category } = useParams();
  const { articles } = useArticleStore();

  const decodedCategory = decodeURIComponent(category as string);

  const filtered = articles.filter(
    (a) =>
      a.status === "published" &&
      a.category?.toLowerCase() === decodedCategory.toLowerCase()
  );

  if (!filtered.length) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold">No articles found</h1>
        <p className="text-gray-500 mt-2">
          No content in this category yet.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-2 capitalize">
        {decodedCategory}
      </h1>

      <p className="text-gray-500 mb-8">
        {filtered.length} article(s)
      </p>

      <div className="grid gap-5">
        {filtered.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="border rounded-xl p-5 hover:shadow transition"
          >
            <h2 className="text-xl font-semibold">
              {article.title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {article.excerpt}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              By {article.author} • {article.createdAt}
            </p>
          </Link>
        ))}
      </div>

    </main>
  );
}