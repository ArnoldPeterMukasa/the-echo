"use client";

import { useArticleStore } from "@/src/store/articleStore";

export default function ArticleReviewCard({ article }: any) {
  const { updateArticle, deleteArticle } = useArticleStore();

  return (
    <div className="border rounded-lg p-4 space-y-3">

      <h2 className="font-bold text-lg">
        {article.title}
      </h2>

      <p className="text-sm text-gray-500">
        By {article.author}
      </p>

      <p className="text-sm text-gray-700">
        {article.summary}
      </p>

      {article.coverImage && (
        <img
          src={article.coverImage}
          className="w-full h-48 object-cover rounded"
        />
      )}

      <div className="flex gap-3 pt-2">

        <button
          onClick={() =>
            updateArticle(article.id, {
              status: "published",
            })
          }
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Approve
        </button>

        <button
          onClick={() =>
            updateArticle(article.id, {
              status: "draft",
            })
          }
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Reject
        </button>

        <button
          onClick={() => deleteArticle(article.id)}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Delete
        </button>

      </div>

    </div>
  );
}