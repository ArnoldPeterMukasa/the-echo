"use client";

import { useArticleStore } from "@/src/store/articleStore";
import Link from "next/link";

export default function ScrollingBanner() {
  const { getTrending } = useArticleStore();

  const trending = getTrending().slice(0, 6);

  if (trending.length === 0) return null;

  return (
    <div className="w-full bg-black text-white overflow-hidden py-2">

      <div className="whitespace-nowrap animate-marquee flex gap-10 px-4">

        {trending.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="text-sm hover:underline"
          >
            🔥 {article.title}
          </Link>
        ))}

      </div>

      {/* animation */}
      <style jsx>{`
        .animate-marquee {
          display: inline-flex;
          animation: scroll 20s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>

    </div>
  );
}