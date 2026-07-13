"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useArticleStore } from "@/src/store/articleStore";

export default function AuthorPage() {
  const { name } = useParams();
  const { articles } = useArticleStore();

  const decodedName = decodeURIComponent(name as string);

  const authorArticles = articles.filter(
    (a) =>
      a.author?.toLowerCase() === decodedName.toLowerCase()
  );

  if (authorArticles.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold">No articles found</h1>
        <p className="text-gray-500 mt-2">
          This author has no published content yet.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">
        {decodedName}
      </h1>

      <p className="text-gray-500 mb-8">
        {authorArticles.length} article(s)
      </p>

      {/* LIST */}
      <div className="grid gap-4">
        {authorArticles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="border rounded-lg p-4 hover:shadow transition"
          >
            <h2 className="font-semibold text-lg">
              {article.title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {article.summary}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              {article.category} • {article.createdAt}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}