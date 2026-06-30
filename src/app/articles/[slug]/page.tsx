"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useArticleStore } from "@/src/store/articleStore";

export default function ArticlePage() {
  const { slug } = useParams();
  const { articles, incrementViews } = useArticleStore();

  const article = articles.find((a) => a.slug === slug);

  useEffect(() => {
    if (article?.id) {
      incrementViews(article.id);
    }
  }, [article?.id]);

  if (!article) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1>Article not found</h1>
      </main>
    );
  }

  const words = article.content?.split(" ").length || 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <main className="max-w-4xl mx-auto px-6 py-14">

      <p className="text-sm text-gray-500 uppercase">
        {article.category}
      </p>

      <h1 className="text-5xl font-bold mt-3">
        {article.title}
      </h1>

      <div className="text-sm text-gray-500 mt-2">
        By {article.author} • {article.views || 0} views • {readingTime} min read
      </div>

      {article.coverImage && (
        <img
          src={article.coverImage}
          className="w-full mt-8 rounded-xl object-cover"
        />
      )}

      <p className="mt-8 text-xl text-gray-600">
        {article.excerpt}
      </p>

      <div className="mt-6 whitespace-pre-line text-lg">
        {article.content}
      </div>

    </main>
  );
}