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

    getFiltered,

    getFeatured,

    getTrending,

  } = useArticleStore();





  // SEARCHED + ONLY PUBLIC ARTICLES

  const published = getFiltered().filter(

    (article) =>

      article.status === "published"

  );





  const featured = getFeatured();





  const trending = getTrending()

    .filter(

      (article) => article.status === "published"

    )

    .slice(0,5);







  const latest = featured

    ? published.filter(

        (article) =>

          article.id !== featured.id

      )

    : published;







  return (



    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">





      {/* SEARCH */}



      <SearchBar />







      {/* NEWS STYLE SCROLLING BANNER */}



      <ScrollingBanner />







      {/* MAGAZINE COVER HERO */}



      <HeroSection

        featured={featured ?? null}

      />







      {!featured && (



        <div className="text-center text-gray-500 py-6">

          No featured article yet.

        </div>



      )}









      {/* ARTICLES + TRENDING */}



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">





        <div className="lg:col-span-2">



          {latest.length > 0 ? (



            <LatestSection

              articles={latest}

            />



          ) : (



            <p className="text-gray-500">

              No articles found.

            </p>



          )}



        </div>









        <aside className="space-y-8">



          {trending.length > 0 ? (



            <TrendingSection

              articles={trending}

            />



          ) : (



            <p className="text-gray-500">

              No trending articles.

            </p>



          )}



        </aside>





      </div>









      <CategorySection />





      <NewsletterSection />





    </main>



  );

}