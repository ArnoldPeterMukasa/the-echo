"use client";

import HeroSection from "@/src/components/Home/HeroSection";
import LatestSection from "@/src/components/Home/LatestSection";
import TrendingSection from "@/src/components/Home/TrendingSection";
import CategorySection from "@/src/components/Home/CategorySection";
import NewsletterSection from "@/src/components/Home/NewsletterSection";
import SearchBar from "@/src/components/SearchBar";
import ScrollingBanner from "@/src/components/Home/ScrollingBanner";
import { useArticleStore } from "@/src/store/articleStore";

export default function Home() {
  const {
    getPublished,
    getFeatured,
    getTrending,
    getFiltered,
  } = useArticleStore();

  // SAFE DEFAULTS (prevents runtime crashes)
  const published = getPublished() ?? [];
  const trending = getTrending() ?? [];
  const featured = getFeatured() ?? null;

  // 🔍 IMPORTANT: use search-aware filtering
  const filteredPublished = getFiltered().filter(
    (a) => a.status === "published"
  );

  const latest = filteredPublished.filter(
    (a) => a.id !== featured?.id
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">

      {/* SEARCH */}
      <SearchBar />

      {/* SCROLLING BANNER */}
      <ScrollingBanner />

      {/* HERO */}
      <HeroSection featured={featured} />

      {/* EMPTY STATE */}
      {!featured && (
        <div className="text-center py-10 text-gray-500">
          No featured article yet. Mark one as featured in dashboard.
        </div>
      )}

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LATEST */}
        <div className="lg:col-span-2">
          <LatestSection articles={latest} />
        </div>

        {/* TRENDING */}
        <aside className="space-y-8">
          <TrendingSection articles={trending} />
        </aside>

      </div>

      {/* CATEGORIES */}
      <CategorySection />

      {/* NEWSLETTER */}
      <NewsletterSection />

    </main>
  );
}