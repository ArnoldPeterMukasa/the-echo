"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useArticleStore } from "@/src/store/articleStore";
import ArticlePreview from "@/src/components/dashboard/ArticlePreview";

export default function NewArticlePage() {
  const router = useRouter();
  const { addArticle } = useArticleStore();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleSubmit = (status: "draft" | "pending") => {
    if (!title.trim()) return; // 🔥 FIX 1: prevent empty articles

    const newArticle = {
      id: crypto.randomUUID(), // 🔥 FIX 2: better unique ID
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
        .replace(/[^\w-]/g, ""), // 🔥 FIX 3: safer slug
      createdAt: new Date().toISOString().split("T")[0],
      status,
      trending: false, // 🔥 important for later sections
    };

    addArticle(newArticle);

    router.push("/dashboard");
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">
        Create New Article
      </h1>

      <div className="space-y-4">

        <input
          className="w-full border p-3 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <textarea
          className="w-full border p-3 rounded h-40"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Cover Image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />

        <div className="flex gap-4 pt-4">

          <button
            onClick={() => handleSubmit("draft")}
            className="px-5 py-2 border rounded"
          >
            Save Draft
          </button>

          <button
            onClick={() => handleSubmit("pending")}
            className="px-5 py-2 bg-black text-white rounded"
          >
            Submit for Review
          </button>

        </div>

      </div>

      <ArticlePreview
        title={title}
        excerpt={excerpt}
        content={content}
        author={author}
        category={category}
        coverImage={coverImage}
      />

    </main>
  );
}