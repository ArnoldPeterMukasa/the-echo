import { articles } from "@/src/data/articles";
import FeaturedSection from "@/src/components/Home/FeaturedSection";
import LatestSection from "@/src/components/Home/LatestSection";
import TrendingSection from "@/src/components/Home/TrendingSection";
import CategorySection from  "@/src/components/Home/CategorySection";
import NewsletterSEction from "@/src/components/Home/NewsletterSection";

export default function Home() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">

      <FeaturedSection featured={featured} />

      <TrendingSection />

      <LatestSection articles={rest} />

      <CategorySection/>

      <NewsletterSEction/>

    </main>
  );
}