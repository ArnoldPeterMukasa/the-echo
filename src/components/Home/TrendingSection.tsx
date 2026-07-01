"use client";

import Link from "next/link";

type Props = {
  articles: any[];
};

export default function TrendingSection({ articles }: Props) {
  if (!articles || articles.length === 0) {
    return (
      <div className="border rounded-xl p-5">
        <h2 className="text-lg font-bold mb-3">Trending</h2>
        <p className="text-sm text-gray-500">No trending articles yet</p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl p-5">

      <h2 className="text-lg font-bold mb-4">
        🔥 Trending
      </h2>

      <div className="space-y-4">

        {articles.slice(0, 5).map((article, index) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="flex gap-3 items-start hover:bg-gray-50 p-2 rounded transition"
          >

            {/* RANK NUMBER */}
            <div className="text-xl font-bold text-gray-400 w-6">
              {index + 1}
            </div>

            {/* CONTENT */}
            <div className="flex-1">

              <h3 className="text-sm font-semibold line-clamp-2">
                {article.title}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {article.views || 0} views • {article.category}
              </p>

            </div>

          </Link>
        ))}

      </div>

    </div>
  );
}