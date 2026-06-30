"use client";

import { useArticleStore } from "@/src/store/articleStore";

export default function Analytics() {
  const { articles } = useArticleStore();

  const totalViews = articles.reduce((sum, article) => sum + (article.views ?? 0), 0);
  const top = articles.reduce((best, article) => {
    if (!best || (article.views ?? 0) > (best.views ?? 0)) {
      return article;
    }
    return best;
  }, null);

  return (
    <section className="grid md:grid-cols-3 gap-6 mb-10">

      {/* TOTAL ARTICLES */}
      <div className="border rounded-xl p-6">
        <h2 className="text-sm text-gray-500">
          Total Articles
        </h2>
        <p className="text-3xl font-bold">
          {articles.length}
        </p>
      </div>

      {/* TOTAL VIEWS */}
      <div className="border rounded-xl p-6">
        <h2 className="text-sm text-gray-500">
          Total Views
        </h2>
        <p className="text-3xl font-bold">
          {totalViews}
        </p>
      </div>

      {/* TOP ARTICLE */}
      <div className="border rounded-xl p-6">
        <h2 className="text-sm text-gray-500">
          Top Article
        </h2>

        {top ? (
          <p className="font-bold text-lg">
            {top.title}
          </p>
        ) : (
          <p className="text-gray-500">
            No data yet
          </p>
        )}
      </div>

    </section>
  );
}