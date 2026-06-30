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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-xl font-bold">Article not found</h1>
      </main>
    );
  }

  const words = article.content?.split(" ").length || 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

      <p className="text-xs sm:text-sm uppercase text-gray-500">
        {article.category}
      </p>

      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mt-3 leading-tight">
        {article.title}
      </h1>

      <div className="text-xs sm:text-sm text-gray-500 mt-3 flex flex-wrap gap-2">
        <span>By {article.author}</span>
        <span>•</span>
        <span>{article.createdAt}</span>
        <span>•</span>
        <span>{article.views || 0} views</span>
        <span>•</span>
        <span>{readingTime} min read</span>
      </div>

      {article.coverImage && (
        <img
          src={article.coverImage}
          loading="lazy"
          className="w-full mt-6 sm:mt-8 rounded-xl max-h-[420px] object-cover"
        />
      )}

      <p className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-700 leading-relaxed">
        {article.excerpt}
      </p>

      <div className="mt-6 sm:mt-8 text-base sm:text-lg leading-8 whitespace-pre-line text-gray-800">
        {article.content}
      </div>

    </main>
  );
}