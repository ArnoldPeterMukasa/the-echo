"use client";

import FeaturedSection from "@/src/components/Home/FeaturedSection";
import LatestSection from "@/src/components/Home/LatestSection";
import TrendingSection from "@/src/components/Home/TrendingSection";
import CategorySection from "@/src/components/Home/CategorySection";
import NewsletterSection from "@/src/components/Home/NewsletterSection";
import SearchBar from "@/src/components/SearchBar";

import { useArticleStore } from "@/src/store/articleStore";

export default function Home() {
  const { getPublished } = useArticleStore();

  const published = getPublished();

  const featured = published[0];
  const rest = published.slice(1);

  if (!featured) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-10">
        <p>No published articles yet.</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">

      <div className="mb-8">
        <SearchBar />
      </div>

      <FeaturedSection featured={featured} />

      <TrendingSection />

      <LatestSection articles={rest} />

      <CategorySection />

      <NewsletterSection />

    </main>
  );
}