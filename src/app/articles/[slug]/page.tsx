"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
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
      <main className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold">Article not found</h1>
        <p className="text-gray-500 mt-2">
          This article may have been deleted or moved.
        </p>
      </main>
    );
  }

  const words = article.content?.split(" ").length || 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const related = articles
    .filter(
      (a) =>
        a.status === "published" &&
        a.id !== article.id &&
        a.category?.toLowerCase() === article.category?.toLowerCase()
    )
    .slice(0, 4);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

      {/* CATEGORY */}
      <p className="text-xs sm:text-sm uppercase text-gray-500">
        {article.category}
      </p>

      {/* TITLE */}
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mt-3 leading-tight">
        {article.title}
      </h1>

      {/* META */}
      <div className="text-xs sm:text-sm text-gray-500 mt-3 flex flex-wrap gap-2">
        <span>
          By{" "}
          <Link
            href={`/author/${encodeURIComponent(article.author)}`}
            className="underline hover:text-black"
          >
            {article.author}
          </Link>
        </span>

        <span>•</span>
        <span>{article.createdAt}</span>
        <span>•</span>
        <span>{article.views || 0} views</span>
        <span>•</span>
        <span>{readingTime} min read</span>
      </div>

      {/* IMAGE (FIXED) */}
      {article.coverImage && (
        <img
          src={article.coverImage}
          loading="lazy"
          alt={article.title}
          className="w-full mt-6 sm:mt-8 rounded-xl max-h-[420px] object-cover"
        />
      )}

      {/* EXCERPT */}
      <p className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-700 leading-relaxed">
        {article.excerpt}
      </p>

      {/* CONTENT */}
      <div className="mt-6 sm:mt-8 text-base sm:text-lg leading-8 whitespace-pre-line text-gray-800">
        {article.content}
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mt-12 border-t pt-8">

          <h2 className="text-xl font-bold mb-4">
            Related Articles
          </h2>

          <div className="grid gap-4">

            {related.map((item) => (
              <Link
                key={item.id}
                href={`/articles/${item.slug}`}
                className="border rounded-lg p-4 hover:shadow transition"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.excerpt}</p>
              </Link>
            ))}

          </div>
        </section>
      )}

    </main>
  );
}