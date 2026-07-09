"use client";

import { useArticleStore } from "@/src/store/articleStore";
import Link from "next/link";

export default function PendingQueue() {
  const { articles, updateArticle } = useArticleStore();

  const pending = articles.filter(
    (a) => a.status === "pending"
  );


  if (pending.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No pending articles to review
      </div>
    );
  }


  return (
    <div className="space-y-4">

      {pending.map((article) => (

        <div
          key={article.id}
          className="border rounded-xl p-4 flex flex-col gap-3"
        >

          {/* TOP INFO */}
          <div className="flex justify-between items-start gap-4">

            <div>

              <h2 className="font-bold text-lg">
                {article.title}
              </h2>


              <p className="text-sm text-gray-500">
                By{" "}
                <Link
                  href={`/author/${encodeURIComponent(article.author)}`}
                  className="underline hover:text-black"
                >
                  {article.author}
                </Link>
              </p>


              <p className="text-xs text-gray-400">
                {article.category} • {article.createdAt}
              </p>

            </div>


            {article.coverImage && (
              <img
                src={article.coverImage}
                alt={article.title}
                loading="lazy"
                className="w-24 h-16 object-cover rounded"
              />
            )}

          </div>



          {/* SUMMARY */}
          <p className="text-sm text-gray-700 line-clamp-2">
            {article.summary || article.content?.slice(0, 120)}
          </p>



          {/* ACTIONS */}
          <div className="flex gap-3">


            <button
              onClick={() =>
                updateArticle(article.id, {
                  status: "published",
                  role: "admin",
                })
              }
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Approve & Publish
            </button>



            <button
              onClick={() =>
                updateArticle(article.id, {
                  status: "draft",
                })
              }
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Reject/send back
            </button>



            <Link
              href={`/articles/${article.slug}`}
              className="px-3 py-1 border rounded"
            >
              Preview
            </Link>


          </div>


        </div>

      ))}

    </div>
  );
}