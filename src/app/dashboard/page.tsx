"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useArticleStore } from "@/src/store/articleStore";
import Analytics from "@/src/components/dashboard/Analytics";

type Filter = "all" | "published" | "pending" | "draft";

export default function DashboardPage() {
  const {
    articles,
    hydrate,
    updateArticle,
    deleteArticle,
  } = useArticleStore();

  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    hydrate();
    setMounted(true);
  }, [hydrate]);

  if (!mounted) {
    return (
      <main className="p-10 text-center text-gray-500">
        Loading dashboard...
      </main>
    );
  }

  const filteredArticles = articles.filter((article) => {
    if (filter === "all") return true;
    return article.status === filter;
  });

  const count = {
    all: articles.length,
    published: articles.filter((a) => a.status === "published").length,
    pending: articles.filter((a) => a.status === "pending").length,
    draft: articles.filter((a) => a.status === "draft").length,
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Writer Dashboard
        </h1>

        <Link
          href="/dashboard/new"
          className="px-5 py-3 bg-black text-white rounded-lg"
        >
          + New Article
        </Link>

      </div>

      <Analytics />

      {/* FILTERS */}
      <div className="flex gap-3 flex-wrap mb-6">

        {(["all", "published", "pending", "draft"] as Filter[]).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg border ${
              filter === key ? "bg-black text-white" : ""
            }`}
          >
            {key.toUpperCase()} ({count[key]})
          </button>
        ))}

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-xl">

        <table className="min-w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-4 text-left">Cover</th>
              <th className="px-5 py-4 text-left">Title</th>
              <th className="px-5 py-4 text-left">Category</th>
              <th className="px-5 py-4 text-left">Status</th>
              <th className="px-5 py-4 text-left">Views</th>
              <th className="px-5 py-4 text-left">Date</th>
              <th className="px-5 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredArticles.map((article) => (
              <tr key={article.id} className="border-t hover:bg-gray-50">

                {/* COVER */}
                <td className="px-5 py-4">
                  {article.coverImage ? (
                    <img
                      src={article.coverImage}
                      loading="lazy"
                      className="w-20 h-14 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-14 bg-gray-200 rounded" />
                  )}
                </td>

                {/* TITLE + AUTHOR LINK */}
                <td className="px-5 py-4">
                  <p className="font-semibold">{article.title}</p>

                  <Link
                    href={`/author/${encodeURIComponent(article.author)}`}
                    className="text-xs text-gray-500 hover:underline"
                  >
                    {article.author}
                  </Link>
                </td>

                <td className="px-5 py-4">{article.category}</td>

                <td className="px-5 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-gray-100">
                    {article.status}
                  </span>
                </td>

                <td className="px-5 py-4">{article.views || 0}</td>
                <td className="px-5 py-4">{article.createdAt}</td>

                <td className="px-5 py-4 flex gap-2">

                  <Link
                    href={`/dashboard/edit/${article.id}`}
                    className="px-3 py-1 border rounded"
                  >
                    Edit
                  </Link>

                  {article.status !== "published" && (
                    <button
                      onClick={() =>
                        updateArticle(article.id, {
                          status: "published",
                        })
                      }
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Publish
                    </button>
                  )}

                  <button
                    onClick={() => deleteArticle(article.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}