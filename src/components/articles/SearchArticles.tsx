"use client";

import { useState } from "react";
import Link from "next/link";
import { articles } from "@/src/data/articles";
import Image from "next/image";

export default function SearchArticles() {
  const [query, setQuery] = useState("");

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Search Input */}
      <div className="mb-8 flex justify-full">
        <div className="relative w-full max-w-xl">
          <input
          type="text"
          placeholder="search  articles..."
          value={query}
          onChange={(e)=> setQuery(e.target.value)}
          className="w-full border rounded-lg px-12 py-3 outline-none focus:ring-2"
          />

          <svg
          className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6 6a7.5 7.5 0 0 0 10.65 10.65Z"
            />
          </svg>
        </div>
      </div>

      {/* Articles */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="border rounded-lg overflow-hidden hover:shadow-md transition"
          >
            <Image
            src={article.coverImage}
            alt={article.title}
            width={600}
            height={400}
            priority={article.id===articles[0].id}
            className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <p className="text-xs text-gray-500 uppercase mb-2">
                {article.category}
              </p>

              <h2 className="text-xl font-bold mb-2">
                {article.title}
              </h2>

              <p className="text-gray-600 text-sm">
                {article.excerpt}
              </p>

              <p className="text-xs text-gray-400 mt-4">
                By {article.author}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}