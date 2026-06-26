"use client";

import Image from "next/image";
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

  
  const words = article.content?.split(" ").length || 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <main className="max-w-4xl mx-auto px-6 py-14">

      <p className="text-sm uppercase text-gray-500">
        {article.category}
      </p>

      <h1 className="text-5xl font-bold mt-3">
        {article.title}
      </h1>

      <div className="text-sm text-gray-500 mt-3">
        By {article.author} • {article.createdAt} • {readingTime} min read
      </div>

      {article.coverImage && (
        <div className="mt-8">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full rounded-xl max-h-[500px] object-cover"
          />
        </div>
      )}

      <p className="mt-8 text-xl text-gray-600">
        {article.excerpt}
      </p>

      <div className="mt-8 text-lg leading-8 whitespace-pre-line">
        {article.content}
      </div>

    </main>
  );
}