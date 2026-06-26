"use client";

import FeaturedSection from "@/src/components/Home/FeaturedSection";
import LatestSection from "@/src/components/Home/LatestSection";
import TrendingSection from "@/src/components/Home/TrendingSection";
import CategorySection from "@/src/components/Home/CategorySection";
import NewsletterSection from "@/src/components/Home/NewsletterSection";
import SearchBar from "@/src/components/SearchBar";

import { useArticleStore } from "@/src/store/articleStore";

export default function Home() {
  const { getPublished, getFeatured } = useArticleStore();

  const published = getPublished();
  const featured = getFeatured();

  const rest = published.filter((a) => a.id !== featured?.id);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">

      <SearchBar />

      {featured && (
        <FeaturedSection featured={featured} />
      )}

      <TrendingSection />

      <LatestSection articles={rest} />

      <CategorySection />

      <NewsletterSection />

    </main>
  );
}