"use client";

import FeaturedSection from "@/src/components/Home/FeaturedSection";
import LatestSection from "@/src/components/Home/LatestSection";
import TrendingSection from "@/src/components/Home/TrendingSection";
import CategorySection from "@/src/components/Home/CategorySection";
import NewsletterSection from "@/src/components/Home/NewsletterSection";
import SearchBar from "@/src/components/SearchBar";
import type { ComponentType } from "react";

import { useArticleStore } from "@/src/store/articleStore";

const TrendingSectionComponent = TrendingSection as ComponentType<{ articles: any[] }>;

export default function Home() {
  const {
    getPublished,
    getFeatured,
    getTrending,
    getFiltered,
    searchQuery,
  } = useArticleStore();

  const isSearching = searchQuery.trim().length > 0;

  const published = getPublished();

  const featured = getFeatured();

  const trending = getTrending();

  const latest = isSearching
    ? getFiltered().filter((a) => a.status === "published")
    : published.slice(1);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">

      {/* SEARCH ALWAYS VISIBLE */}
      <SearchBar />

      {/* EMPTY STATE */}
      {published.length === 0 ? (
        <p className="text-center text-gray-500">
          No articles yet. Create your first one.
        </p>
      ) : (
        <>
          {/* FEATURED */}
          {featured && (
            <FeaturedSection featured={featured} />
          )}

          {/* TRENDING */}
          {trending.length > 0 && (
            <TrendingSectionComponent articles={trending} />
          )}

          {/* LATEST / SEARCH RESULTS */}
          <LatestSection articles={latest} />

          <CategorySection />
          <NewsletterSection />
        </>
      )}

    </main>
  );
}