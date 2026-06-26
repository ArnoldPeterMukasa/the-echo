"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useArticleStore } from "@/src/store/articleStore";

export default function DashboardPage() {
  const {
    articles,
    hydrate,
    updateArticle,
    deleteArticle,
  } = useArticleStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const drafts = articles.filter((a) => a.status === "draft");
  const pending = articles.filter((a) => a.status === "pending");
  const published = articles.filter((a) => a.status === "published");

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold">
          Writer Dashboard
        </h1>

        <Link
          href="/dashboard/new"
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          + New Article
        </Link>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="border rounded-xl p-6">
          <h2 className="text-sm text-gray-500">Drafts</h2>
          <p className="text-3xl font-bold">{drafts.length}</p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-sm text-gray-500">Pending Review</h2>
          <p className="text-3xl font-bold">{pending.length}</p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-sm text-gray-500">Published</h2>
          <p className="text-3xl font-bold">{published.length}</p>
        </div>

      </div>

      {/* PUBLISHED */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Published Articles
        </h2>

        <div className="space-y-4">
          {published.map((article) => (
            <div
              key={article.id}
              className="border rounded-lg p-5"
            >
              <Link href={`/articles/${article.slug}`}>
                <h3 className="font-bold text-lg">
                  {article.title}
                </h3>

                <p className="text-sm text-gray-600">
                  {article.excerpt}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {article.category} • {article.createdAt}
                </p>
              </Link>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-4">

                {/* EDIT BUTTON (ADDED) */}
                <Link
                  href={`/dashboard/edit/${article.id}`}
                  className="px-3 py-1 text-sm border rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    updateArticle(article.id, {
                      status: "pending",
                    })
                  }
                  className="px-3 py-1 text-sm border rounded"
                >
                  Move to Pending
                </button>

                <button
                  onClick={() => deleteArticle(article.id)}
                  className="px-3 py-1 text-sm border rounded text-red-500"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PENDING */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">
          Pending Review
        </h2>

        <div className="space-y-4">
          {pending.map((article) => (
            <div
              key={article.id}
              className="border rounded-lg p-5"
            >
              <h3 className="font-bold text-lg">
                {article.title}
              </h3>

              <p className="text-sm text-gray-600">
                {article.excerpt}
              </p>

              <div className="flex gap-3 mt-4">

                <button
                  onClick={() =>
                    updateArticle(article.id, {
                      status: "published",
                    })
                  }
                  className="px-3 py-1 text-sm bg-black text-white rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateArticle(article.id, {
                      status: "draft",
                    })
                  }
                  className="px-3 py-1 text-sm border rounded"
                >
                  Send Back to Draft
                </button>

              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}