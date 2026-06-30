"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useArticleStore } from "@/src/store/articleStore";
import Analytics from "@/src/components/dashboard/Analytics";

export default function DashboardPage() {
  const {
    articles,
    hydrate,
    updateArticle,
    deleteArticle,
  } = useArticleStore();

  const [filter, setFilter] = useState<
    "all" | "published" | "pending" | "draft"
  >("all");

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const filteredArticles = articles.filter((article) => {
    if (filter === "all") return true;
    return article.status === filter;
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

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

      <div className="flex flex-wrap gap-3 mb-6">

        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all"
              ? "bg-black text-white"
              : "border"
          }`}
        >
          All ({articles.length})
        </button>

        <button
          onClick={() => setFilter("published")}
          className={`px-4 py-2 rounded-lg ${
            filter === "published"
              ? "bg-black text-white"
              : "border"
          }`}
        >
          Published (
          {
            articles.filter(
              (a) => a.status === "published"
            ).length
          }
          )
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-lg ${
            filter === "pending"
              ? "bg-black text-white"
              : "border"
          }`}
        >
          Pending (
          {
            articles.filter(
              (a) => a.status === "pending"
            ).length
          }
          )
        </button>

        <button
          onClick={() => setFilter("draft")}
          className={`px-4 py-2 rounded-lg ${
            filter === "draft"
              ? "bg-black text-white"
              : "border"
          }`}
        >
          Drafts (
          {
            articles.filter(
              (a) => a.status === "draft"
            ).length
          }
          )
        </button>

      </div>

      <div className="overflow-x-auto border rounded-xl">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left px-5 py-4">
                Cover
              </th>

              <th className="text-left px-5 py-4">
                Title
              </th>

              <th className="text-left px-5 py-4">
                Category
              </th>

              <th className="text-left px-5 py-4">
                Status
              </th>

              <th className="text-left px-5 py-4">
                Views
              </th>

              <th className="text-left px-5 py-4">
                Date
              </th>

              <th className="text-left px-5 py-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredArticles.map((article) => (

              <tr
                key={article.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-5 py-4">

                  {article.coverImage ? (
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-14 bg-gray-200 rounded" />
                  )}

                </td>

                <td className="px-5 py-4">

                  <p className="font-semibold">
                    {article.title}
                  </p>

                  <p className="text-xs text-gray-500">
                    {article.author}
                  </p>

                </td>

                <td className="px-5 py-4">
                  {article.category}
                </td>

                <td className="px-5 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs
                    ${
                      article.status === "published"
                        ? "bg-green-100 text-green-700"
                        : article.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {article.status}
                  </span>

                </td>

                <td className="px-5 py-4">
                  {article.views || 0}
                </td>

                <td className="px-5 py-4">
                  {article.createdAt}
                </td>

                <td className="px-5 py-4">

                  <div className="flex gap-2 flex-wrap">

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
                      onClick={() =>
                        deleteArticle(article.id)
                      }
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}