"use client";

import { useArticleStore } from "@/src/store/articleStore";
import ArticleReviewCard from "./ArticleReviewCard";

export default function PendingQueue() {
  const { articles } = useArticleStore();

  const pending = articles.filter(
    (a) => a.status === "pending"
  );

  if (pending.length === 0) {
    return (
      <p className="text-gray-500">
        No articles waiting for review
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {pending.map((article) => (
        <ArticleReviewCard key={article.id} article={article} />
      ))}
    </div>
  );
}