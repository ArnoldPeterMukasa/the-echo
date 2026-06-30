"use client";

import { useArticleStore } from "@/src/store/articleStore";

export default function Analytics() {
  const articles = useArticleStore((s) => s.articles);
  const getTotalViews = useArticleStore((s) => s.getTotalViews);
  const getTopArticle = useArticleStore((s) => s.getTopArticle);

  const top = getTopArticle();

  return (
    <section className="grid md:grid-cols-3 gap-6 mb-10">

      {/* TOTAL ARTICLES */}
      <div className="border rounded-xl p-6">
        <h2 className="text-sm text-gray-500">Total Articles</h2>
        <p className="text-3xl font-bold">{articles.length}</p>
      </div>

      {/* TOTAL VIEWS */}
      <div className="border rounded-xl p-6">
        <h2 className="text-sm text-gray-500">Total Views</h2>
        <p className="text-3xl font-bold">{getTotalViews()}</p>
      </div>

      {/* TOP ARTICLE */}
      <div className="border rounded-xl p-6">
        <h2 className="text-sm text-gray-500">Top Article</h2>

        {top ? (
          <p className="font-bold text-lg">{top.title}</p>
        ) : (
          <p className="text-gray-500">No data yet</p>
        )}
      </div>

    </section>
  );
}