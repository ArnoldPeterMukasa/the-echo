"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
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
    <main className="max-w-5xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-8 capitalize">
        {slug} Stories
      </h1>

      <div className="space-y-4">
        {filtered.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="block border p-5 rounded hover:shadow"
          >
            <h2 className="font-bold text-lg">
              {article.title}
            </h2>

            <p className="text-sm text-gray-600">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>

    </main>
  );
}