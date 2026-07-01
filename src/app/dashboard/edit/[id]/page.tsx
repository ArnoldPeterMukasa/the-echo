"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useArticleStore } from "@/src/store/articleStore";
import { uploadImage } from "@/src/lib/uploadImage";

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

  const [uploading, setUploading] = useState(false);

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
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-xl font-bold">Article not found</h1>
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
    });

    router.push("/dashboard");
  };

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

        {/* IMAGE UPLOAD (CLOUDINARY) */}
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
            className="w-full rounded-lg max-h-[300px] object-cover"
          />
        )}

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