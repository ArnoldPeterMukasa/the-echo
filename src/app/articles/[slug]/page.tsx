"use client";

import { useParams } from "next/navigation";
import { useArticleStore } from "@/src/store/articleStore";

export default function ArticlePage() {
  const { slug } = useParams();

  const { articles } = useArticleStore();

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold">Article not found</h1>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">

      {/* CATEGORY */}
      <p className="text-sm text-gray-500 uppercase tracking-wide">
        {article.category}
      </p>

      {/* TITLE */}
      <h1 className="text-5xl font-bold mt-3 leading-tight">
        {article.title}
      </h1>

      {/* META */}
      <div className="mt-4 text-sm text-gray-400">
        By <span className="text-gray-700">{article.author}</span>
        {" "}• {article.createdAt}
      </div>

      {/* COVER IMAGE */}
      {article.coverImage && (
        <div className="mt-8">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full rounded-xl object-cover max-h-[500px]"
          />
        </div>
      )}

      {/* EXCERPT */}
      <p className="mt-8 text-xl text-gray-600 leading-relaxed">
        {article.excerpt}
      </p>

      {/* CONTENT */}
      <div className="mt-8 text-lg leading-8 text-gray-800 whitespace-pre-line">
        {article.content}
      </div>

    </main>
  );
}