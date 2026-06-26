"use client";

import { useParams } from "next/navigation";
import { useArticleStore } from "@/src/store/articleStore";

export default function ArticlePage() {
  const { slug } = useParams();
  const { articles } = useArticleStore();

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold">Article not found</h1>
      </main>
    );
  }

  // reading time (simple + safe)
  const words = article.content?.split(" ").length || 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <main className="max-w-4xl mx-auto px-6 py-14">

      {/* CATEGORY */}
      <p className="text-sm uppercase tracking-widest text-gray-500">
        {article.category}
      </p>

      {/* TITLE */}
      <h1 className="text-5xl font-bold mt-3 leading-tight">
        {article.title}
      </h1>

      {/* META */}
      <div className="mt-4 text-sm text-gray-500 flex gap-2 flex-wrap">
        <span>
          By <span className="text-gray-800 font-medium">{article.author}</span>
        </span>

        <span>•</span>

        <span>{article.createdAt}</span>

        <span>•</span>

        <span>{readingTime} min read</span>
      </div>

      {/* HERO IMAGE */}
      {article.coverImage && (
        <div className="mt-8">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full rounded-xl max-h-[520px] object-cover shadow-md"
            loading="eager"
          />
        </div>
      )}

      {/* EXCERPT */}
      <p className="mt-8 text-xl text-gray-600 leading-relaxed">
        {article.excerpt}
      </p>

      {/* CONTENT */}
      <div className="mt-8 text-lg leading-8 text-gray-800 whitespace-pre-line max-w-3xl mx-auto">
        {article.content}
      </div>

    </main>
  );
}