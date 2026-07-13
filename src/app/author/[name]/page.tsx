"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useArticleStore } from "@/src/store/articleStore";

export default function AuthorPage() {
  const { name } = useParams();
  const { articles } = useArticleStore();

  const decodedName = decodeURIComponent(name as string);

  const authorArticles = articles.filter(
    (a) =>
      a.status === "published" &&
      a.author?.toLowerCase() === decodedName.toLowerCase()
  );

  if (authorArticles.length === 0) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-black">
          {decodedName}
        </h1>

        <p className="text-gray-500 mt-4">
          This author has no published articles yet.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">

      {/* HEADER */}
      <section className="border-b pb-8 mb-10">

        <p className="uppercase tracking-[0.35em] text-yellow-500 text-sm font-semibold">
          Author
        </p>

        <h1 className="text-5xl font-black mt-3">
          {decodedName}
        </h1>

        <p className="mt-3 text-gray-500">
          {authorArticles.length} Published Article
          {authorArticles.length > 1 && "s"}
        </p>

      </section>

      {/* ARTICLES */}
      <div className="grid md:grid-cols-2 gap-8">

        {authorArticles.map((article) => (

          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="group border rounded-2xl overflow-hidden hover:shadow-xl transition"
          >

            {article.coverImage && (
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
              />
            )}

            <div className="p-6">

              <p className="uppercase text-xs text-yellow-600 font-semibold">
                {article.category}
              </p>

              <h2 className="text-2xl font-bold mt-2 group-hover:text-yellow-600 transition">
                {article.title}
              </h2>

              <p className="mt-3 text-gray-600 line-clamp-3">
                {article.summary}
              </p>

              <div className="mt-6 flex justify-between text-sm text-gray-500">

                <span>
                  {article.createdAt}
                </span>

                <span>
                  {article.views || 0} views
                </span>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </main>
  );
}