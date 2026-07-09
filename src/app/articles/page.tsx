"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useArticleStore } from "@/src/store/articleStore";

export default function ArticlesPage() {
  const {
    articles,
    hydrate,
  } = useArticleStore();


  useEffect(() => {
    hydrate();
  }, [hydrate]);


  const publishedArticles = articles.filter(
    (article) =>
      article.status === "published"
  );


  return (
    <main className="max-w-6xl mx-auto px-6 py-10">


      <h1 className="text-4xl font-bold mb-8">
        Magazine Articles
      </h1>



      {publishedArticles.length === 0 ? (

        <p className="text-gray-500">
          No published articles yet.
        </p>

      ) : (


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">


          {publishedArticles.map((article) => (

            <article
              key={article.id}
              className="border rounded-xl overflow-hidden hover:shadow-lg transition"
            >


              <Link href={`/articles/${article.slug}`}>

                {article.coverImage && (

                  <img
                    src={article.coverImage}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-56 object-cover"
                  />

                )}


                <div className="p-5">


                  <p className="text-xs uppercase text-gray-500">
                    {article.category}
                  </p>


                  <h2 className="text-xl font-bold mt-2">
                    {article.title}
                  </h2>


                  <p className="text-gray-600 mt-3 line-clamp-3">
                    {article.summary}
                  </p>


                  <div className="mt-4 text-sm text-gray-500">
                    By {article.author}
                  </div>


                  <div className="text-xs text-gray-400 mt-2">
                    {article.views || 0} views
                  </div>


                </div>


              </Link>


            </article>

          ))}


        </div>

      )}


    </main>
  );
}