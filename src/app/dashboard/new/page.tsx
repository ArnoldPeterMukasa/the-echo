"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useArticleStore } from "@/src/store/articleStore";
import { uploadImage } from "@/src/lib/uploadImage";
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

  const [featured, setFeatured] = useState(false);

  const [uploading, setUploading] = useState(false);

  const handleSubmit = (status: "draft" | "pending") => {
    if (!title.trim()) return;

    const newArticle = {
      id: crypto.randomUUID(),
      title,
      excerpt,
      summary: excerpt,
      content,
      category,
      author,
      coverImage,

      featured,
      views: 0,
      trending: false,

      slug: title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),

      createdAt: new Date().toISOString().split("T")[0],
      status,
    };

    addArticle(newArticle);

    router.push("/dashboard");
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">
        Create Article
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

        {/* FEATURED ARTICLE */}
        <label className="flex items-center gap-3 border rounded p-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />

          <span>Feature this article on the homepage</span>
        </label>

        {/* CLOUDINARY UPLOAD */}
        <input
          type="file"
          accept="image/*"
          className="w-full border p-3 rounded"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setUploading(true);

            const url = await uploadImage(file);

            setCoverImage(url);

            setUploading(false);
          }}
        />

        {uploading && (
          <p className="text-sm text-gray-500">
            Uploading image...
          </p>
        )}

        {coverImage && (
          <img
            src={coverImage}
            alt="Cover preview"
            className="w-full rounded-lg max-h-[300px] object-cover"
          />
        )}

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
            Submit
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