"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { uploadImage } from "@/src/lib/uploadImage";

export default function EditArticlePage() {
  const { id } = useParams();
  const router = useRouter();

  const [article, setArticle] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      try {
        const response = await fetch(`/api/articles/${id}`);

        if (!response.ok) return;

        const data = await response.json();

        setArticle(data);

        setTitle(data.title || "");
        setSummary(data.excerpt || "");
        setContent(data.content || "");
        setCategory(data.category || "");
        setCoverImage(data.coverImage || "");
      } catch (error) {
        console.error(error);
      }
    }

    if (id) {
      loadArticle();
    }
  }, [id]);

  async function handleUpdate() {
    try {
      setSaving(true);

      const response = await fetch(`/api/articles/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          excerpt: summary,
          content,
          category,
          coverImage,
        }),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to update article");
    } finally {
      setSaving(false);
    }
  }

  if (!article) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-xl font-bold">
          Loading article...
        </h1>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-8">
        Edit Article
      </h1>

      <div className="space-y-5">

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Short Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <textarea
          className="w-full border rounded-lg p-3 h-56"
          placeholder="Write your article..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div>

          <p className="font-semibold mb-2">
            Cover Image
          </p>

          <input
            type="file"
            accept="image/*"
            className="w-full border rounded-lg p-3"
            onChange={async (e) => {

              const file = e.target.files?.[0];

              if (!file) return;

              try {

                setUploading(true);

                const url = await uploadImage(file);

                setCoverImage(url);

              } catch (error) {

                console.error(error);

                alert("Image upload failed");

              } finally {

                setUploading(false);

              }

            }}
          />

        </div>

        {uploading && (

          <p className="text-sm text-gray-500">
            Uploading image...
          </p>

        )}

        {coverImage && (

          <img
            src={coverImage}
            alt="Cover"
            className="w-full max-h-[320px] rounded-xl object-cover"
          />

        )}

        <button
          onClick={handleUpdate}
          disabled={saving}
          className="px-6 py-3 bg-black text-white rounded-lg disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </div>

    </main>
  );
}