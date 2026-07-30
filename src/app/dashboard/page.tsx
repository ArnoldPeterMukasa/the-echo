"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Analytics from "@/src/components/dashboard/Analytics";

type Filter =
  | "all"
  | "published"
  | "pending"
  | "draft";

type Article = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  coverImage?: string;
  status: "draft" | "pending" | "published";
  views?: number;
  createdAt: string;
  author?: {
    _id: string;
    firstName: string;
    lastName: string;
    image?: string;
  };
};

export default function DashboardPage() {
  const {
    data: session,
    status,
  } = useSession();

  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/writer/login");
      return;
    }

    if (session.user.role === "admin") {
      router.push("/dashboard/admin");
      return;
    }

    if (session.user.role !== "writer") {
      router.push("/auth");
      return;
    }

    const userId = session.user.id;

    async function loadArticles() {
      try {
        const response = await fetch("/api/articles");
        const data = await response.json();

        // show only this writer's articles
        const mine = data.filter(
          (article: Article) =>
            article.author?._id === userId
        );

        setArticles(mine);

      } catch (error) {

        console.error(error);

      } finally {

        setMounted(true);

      }
    }

    loadArticles();

  }, [status, session, router]);

  async function deleteArticle(id: string) {

    const confirmed = confirm(
      "Delete this article permanently?"
    );

    if (!confirmed) return;

    try {

      setProcessingId(id);

      const response = await fetch(
        `/api/articles/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setArticles((prev) =>
        prev.filter(
          (article) => article._id !== id
        )
      );

    } catch (error) {

      console.error(error);

      alert("Failed to delete article");

    } finally {

      setProcessingId(null);

    }
  }

  async function submitReview(id: string) {
    try {

      setProcessingId(id);

      const response = await fetch(
        `/api/articles/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "pending",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      setArticles((prev) =>
        prev.map((article) =>
          article._id === id
            ? { ...article, status: "pending" }
            : article
        )
      );

    } catch (error) {

      console.error(error);

      alert("Could not submit for review");

    } finally {

      setProcessingId(null);

    }
  }

  if (status === "loading") {
    return (
      <main className="p-10 text-center text-gray-500">
        Checking login...
      </main>
    );
  }

  if (!session) return null;

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

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Writer Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your submitted articles.
          </p>
        </div>

        <Link
          href="/dashboard/new"
          className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          + New Article
        </Link>
      </div>

      <Analytics />

      <div className="flex gap-3 mb-6 flex-wrap">
        {(["all", "published", "pending", "draft"] as Filter[])
          .map((key) => (

            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                filter === key
                  ? "bg-black text-white border-black"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
              ({count[key]})
            </button>

          ))}
      </div>

      <div className="overflow-x-auto border rounded-2xl bg-white shadow-sm">

        <table className="min-w-full">

          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold">Cover</th>
              <th className="px-5 py-4 text-left text-sm font-semibold">Title</th>
              <th className="px-5 py-4 text-left text-sm font-semibold">Category</th>
              <th className="px-5 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-5 py-4 text-left text-sm font-semibold">Views</th>
              <th className="px-5 py-4 text-left text-sm font-semibold">Date</th>
              <th className="px-5 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredArticles.length === 0 ? (

              <tr>
                <td
                  colSpan={7}
                  className="text-center py-14 text-gray-500"
                >
                  No articles found for this filter.
                </td>
              </tr>

            ) : (

              filteredArticles.map((article) => (

                <tr
                  key={article._id}
                  className="border-b last:border-0 hover:bg-gray-50 transition"
                >

                  <td className="px-5 py-4">

                    {article.coverImage ? (

                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-20 h-14 object-cover rounded-lg"
                      />

                    ) : (

                      <div className="w-20 h-14 bg-gray-200 rounded-lg" />

                    )}

                  </td>

                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900">
                      {article.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {article.author
                        ? `${article.author.firstName} ${article.author.lastName}`
                        : "Unknown"}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {article.category}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
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

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {article.views || 0}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {new Date(article.createdAt)
                      .toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex flex-wrap gap-2">

                      <Link
                        href={`/dashboard/edit/${article._id}`}
                        className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-50 transition"
                      >
                        Edit
                      </Link>

                      {article.status === "draft" && (
                        <button
                          disabled={processingId === article._id}
                          onClick={() => submitReview(article._id)}
                          className="px-3 py-1.5 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700 transition disabled:opacity-50"
                        >
                          {processingId === article._id
                            ? "Submitting..."
                            : "Submit"}
                        </button>
                      )}

                      <button
                        disabled={processingId === article._id}
                        onClick={() => deleteArticle(article._id)}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition disabled:opacity-50"
                      >
                        {processingId === article._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </main>
  );
}