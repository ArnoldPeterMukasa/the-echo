"use client";

import { useArticleStore } from "@/src/store/articleStore";
import Link from "next/link";

export default function SearchBar() {
  const { searchQuery, setSearchQuery, getFiltered } =
    useArticleStore();

  const results = getFiltered();

  return (
    <div className="mb-10">


      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search articles..."
        className="w-full border rounded-lg px-4 py-3"
      />

      {searchQuery && (
        <div className="mt-4 space-y-3">
          {results.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="block border p-4 rounded hover:shadow"
            >
              <p className="text-xs text-gray-500">
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