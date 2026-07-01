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

  const featured = getFeatured();
  const trending = getTrending();
  const published = getPublished();

  // 🔥 SEARCH INTEGRATION (ADDED HERE)
  const filtered = getFiltered();

  const latest = published.filter(
    (a) => a.id !== featured?.id
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

      <SearchBar />

      <HeroSection featured={featured} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2">
          {/* 🔥 SEARCH OVERRIDE LOGIC */}
          <LatestSection
            articles={filtered.length > 0 ? filtered : latest}
          />
        </div>

        <aside className="space-y-8">
          <TrendingSection articles={trending} />
        </aside>

      </div>

      <CategorySection />
      <NewsletterSection />

    </main>
  );
}