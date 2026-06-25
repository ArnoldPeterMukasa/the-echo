"use client";

import Link from "next/link";
import Image from "next/image";
import { useArticleStore } from "@/src/store/articleStore";

export default function TrendingSection() {
  const { getTrending } = useArticleStore();

  const trending = getTrending();

  if (!trending.length) return null;

  return (
    <section className="mb-16">

      <h2 className="text-3xl font-bold mb-8">
        Trending Stories
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {trending.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition"
          >

            {article.coverImage && (
              <Image
                src={article.coverImage}
                alt={article.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-5">

              <p className="text-xs uppercase text-gray-500 mb-2">
                {article.category}
              </p>

              <h3 className="font-bold text-lg mb-3">
                {article.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {article.excerpt}
              </p>

            </div>

          </Link>
        ))}

      </div>

    </section>
  );
}