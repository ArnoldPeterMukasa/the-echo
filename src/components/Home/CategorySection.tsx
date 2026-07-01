"use client";

import Link from "next/link";
import { useArticleStore } from "@/src/store/articleStore";

export default function CategorySection() {
  const { articles } = useArticleStore();

  const categoriesMap: Record<string, number> = {};

  articles.forEach((article) => {
    if (!article.category) return;

    const key = article.category.toLowerCase().trim();
    categoriesMap[key] = (categoriesMap[key] || 0) + 1;
  });

  const categories = Object.entries(categoriesMap);

  if (!categories.length) return null;

  return (
    <section className="mt-12">

      <h2 className="text-2xl font-bold mb-6">
        Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {categories.map(([category, count]) => (
          <Link
            key={category}
            href={`/category/${encodeURIComponent(category)}`}
            className="border rounded-xl p-5 hover:shadow-md transition bg-white"
          >

            <h3 className="text-lg font-semibold capitalize">
              {category}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {count} articles
            </p>

          </Link>
        ))}

      </div>

    </section>
  );
}