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

  // Load existing article into form
  useEffect(() => {
    if (article) {
      setTitle(article.title || "");
      setExcerpt(article.excerpt || "");
      setContent(article.content || "");
      setCategory(article.category || "");
      setAuthor(article.author || "");
      setCoverImage(article.coverImage || "");
    }
  }, [article]);

  const handleUpdate = () => {
    if (!article) return;

    updateArticle(article.id, {
      title,
      excerpt,
      content,
      category,
      author,
      coverImage,
      slug: title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),
    });

    router.push("/dashboard");
  };

  if (!article) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-xl font-bold">Article not found</h1>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-6">
        Edit Article
      </h1>

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