"use client";

import Link from "next/link";
import { useArticleStore } from "@/src/store/articleStore";

export default function ScrollingBanner() {
  const { getTrending } = useArticleStore();

  const trending = getTrending().slice(0, 8);

  if (!trending.length) return null;

  return (
    <div className="w-full overflow-hidden border-y bg-black text-white">
      
      <div className="flex whitespace-nowrap animate-scroll py-2">

        {/* duplicate twice for smooth infinite loop */}
        {[...trending, ...trending].map((article, i) => (
          <Link
            key={i}
            href={`/articles/${article.slug}`}
            className="mx-6 text-sm hover:underline"
          >
            🔥 {article.title}
          </Link>
        ))}

      </div>

      {/* animation */}
      <style jsx>{`
        .animate-scroll {
          display: inline-flex;
          min-width: 100%;
          animation: scroll 20s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

    </div>
  );
}