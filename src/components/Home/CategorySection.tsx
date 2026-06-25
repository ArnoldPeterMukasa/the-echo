"use client";

import { useArticleStore } from "@/src/store/articleStore";

export default function CategorySection() {
  const { articles } = useArticleStore();

  const categories = Array.from(
    new Set(articles.map((a) => a.category))
  );

  return (
    <section className="mb-16">

      <h2 className="text-2xl font-semibold mb-6">
        Browse by Category
      </h2>

      <div className="flex flex-wrap gap-3">

        {categories.map((cat) => (
          <span
            key={cat}
            className="px-4 py-2 border rounded-full text-sm"
          >
            {cat}
          </span>
        ))}

      </div>

    </section>
  );
}