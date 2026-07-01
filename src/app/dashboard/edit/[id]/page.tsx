"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useArticleStore } from "@/src/store/articleStore";

export default function EditArticlePage() {
  const { id } = useParams();
  const router = useRouter();

  const { articles, updateArticle } = useArticleStore();

  const article = articles.find((a) => a.id === id);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!article) return;

    setTitle(article.title || "");
    setExcerpt(article.excerpt || "");
    setContent(article.content || "");
    setCategory(article.category || "");
    setAuthor(article.author || "");
    setCoverImage(article.coverImage || "");
  }, [article]);

  // mark changes
  useEffect(() => {
    setDirty(true);
  }, [title, excerpt, content, category, author, coverImage]);

  // AUTO SAVE every 3 seconds
  useEffect(() => {
    if (!article) return;

    const interval = setInterval(() => {
      if (!dirty) return;

      updateArticle(article.id, {
        title,
        excerpt,
        content,
        category,
        author,
        coverImage,
      });

      setDirty(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [dirty, title, excerpt, content, category, author, coverImage]);

  // warning before leaving
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  if (!article) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-xl font-bold">Article not found</h1>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Edit Article</h1>

        {dirty && (
          <span className="text-sm text-orange-500">
            Unsaved changes...
          </span>
        )}
      </div>

      <div className="space-y-4">

        <input
          className="w-full border p-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <input
          className="w-full border p-3 rounded"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Excerpt"
        />

        <textarea
          className="w-full border p-3 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />

        <input
          className="w-full border p-3 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />

        <input
          className="w-full border p-3 rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />

        <input
          className="w-full border p-3 rounded"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="Cover Image URL"
        />

        {coverImage && (
          <img
            src={coverImage}
            className="w-full rounded-lg max-h-[300px] object-cover"
          />
        )}

        {/* MANUAL SAVE BUTTON (backup) */}
        <button
          onClick={() => {
            updateArticle(article.id, {
              title,
              excerpt,
              content,
              category,
              author,
              coverImage,
            });
            setDirty(false);
          }}
          className="px-5 py-2 bg-black text-white rounded"
        >
          Save Now
        </button>

      </div>
    </main>
  );
}