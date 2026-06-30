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

  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);

  useEffect(() => {
    if (!article) return;

    setTitle(article.title);
    setExcerpt(article.excerpt);
    setContent(article.content);
    setCategory(article.category);
    setAuthor(article.author);
    setCoverImage(article.coverImage);
    setFeatured(article.featured ?? false);
    setTrending(article.trending ?? false);
  }, [article]);

  if (!article) {
    return (
      <main className="max-w-3xl mx-auto py-12">
        <h1 className="text-2xl font-bold">
          Article not found
        </h1>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">
        Edit Article
      </h1>

      <div className="space-y-4">

        <input
          className="w-full border rounded p-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border rounded p-3"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <textarea
          className="w-full border rounded p-3 h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="w-full border rounded p-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="w-full border rounded p-3"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="w-full border rounded p-3"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const url = await uploadImage(file);
            setCoverImage(url);
          }}
        />

        {coverImage && (
          <img
            src={coverImage}
            alt="Cover"
            className="w-full rounded-lg max-h-72 object-cover"
          />
        )}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />

          Featured Article
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={trending}
            onChange={(e) => setTrending(e.target.checked)}
          />

          Trending Article
        </label>

        <button
          onClick={() => {
            updateArticle(article.id, {
              title,
              excerpt,
              content,
              category,
              author,
              coverImage,
              featured,
              trending,
            });

            router.push("/dashboard");
          }}
          className="px-6 py-3 bg-black text-white rounded"
        >
          Save Changes
        </button>

      </div>

    </main>
  );
}