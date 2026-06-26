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

  useEffect(() => {
    if (!article) return;

    setTitle(article.title || "");
    setExcerpt(article.excerpt || "");
    setContent(article.content || "");
    setCategory(article.category || "");
    setAuthor(article.author || "");
    setCoverImage(article.coverImage || "");
  }, [article]);

  if (!article) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold">Article not found</h1>
      </main>
    );
  }

  const handleUpdate = () => {
    updateArticle(article.id, {
      title,
      excerpt,
      content,
      category,
      author,
      coverImage,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
    });

    router.push("/dashboard");
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-8">
        Edit Article
      </h1>

      <div className="space-y-4">

        <input
          className="w-full border p-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <textarea
          className="w-full border p-3 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          className="px-5 py-2 bg-black text-white rounded"
        >
          Save Changes
        </button>

      </div>

    </main>
  );
}