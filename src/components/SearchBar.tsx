"use client";

import { useState } from "react";
import Link from "next/link";
import { useArticleStore } from "@/src/store/articleStore";

export default function SearchBar() {
  const { articles } = useArticleStore();
  const [query, setQuery] = useState("");

  const results = articles.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mb-10">

      {/* INPUT */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="w-full border rounded-lg px-4 py-3"
      />

      {/* RESULTS */}
      {query && (
        <div className="mt-4 grid gap-3">

          {results.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="border p-4 rounded hover:shadow"
            >
              <p className="text-sm text-gray-500">
                {article.category}
              </p>

              <h3 className="font-bold">
                {article.title}
              </h3>

              <p className="text-sm text-gray-600">
                {article.excerpt}
              </p>
            </Link>
          ))}

        </div>
      )}

    </div>
  );
}