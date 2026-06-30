"use client";

import HeroSection from "@/src/components/Home/HeroSection";
import LatestSection from "@/src/components/Home/LatestSection";
import TrendingSection from "@/src/components/Home/TrendingSection";
import CategorySection from "@/src/components/Home/CategorySection";
import NewsletterSection from "@/src/components/Home/NewsletterSection";
import SearchBar from "@/src/components/SearchBar";

import { useArticleStore } from "@/src/store/articleStore";

export default function Home() {
  const {
    getPublished,
    getFeatured,
    getTrending,
    getFiltered,
  } = useArticleStore();

  // 🔍 search-aware published articles
  const published = getFiltered().filter(
    (a) => a.status === "published"
  );

  const featured = getFeatured();
  const trending = getTrending();

  const rest = published.filter(
    (a) => a.id !== featured?.id
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

      <SearchBar />

      <HeroSection featured={featured} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

        <div className="lg:col-span-2">
          <LatestSection articles={rest} />
        </div>

        <aside className="lg:col-span-1 space-y-8">
          <TrendingSection articles={trending} />
        </aside>

      </div>

      <CategorySection />
      <NewsletterSection />

    </main>
  );
}