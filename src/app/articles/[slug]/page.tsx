"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useArticleStore } from "@/src/store/articleStore";

export default function ArticlePage() {

  const { slug } = useParams();

  const {
    articles,
    hydrate,
    incrementViews,
  } = useArticleStore();



  // Load articles from storage
  useEffect(() => {
    hydrate();
  }, [hydrate]);



  const article = articles.find(
    (a) => a.slug === slug
  );



  // count views once
  useEffect(() => {

    if (article?.id) {

      const viewed =
        sessionStorage.getItem(
          `viewed-${article.id}`
        );


      if (!viewed) {

        incrementViews(article.id);

        sessionStorage.setItem(
          `viewed-${article.id}`,
          "true"
        );

      }

    }

  }, [article?.id]);



  if (!article) {

    return (

      <main className="max-w-3xl mx-auto px-6 py-16 text-center">

        <h1 className="text-2xl font-bold">
          Article not found
        </h1>

        <p className="text-gray-500 mt-2">
          This article may have been deleted or moved.
        </p>

      </main>

    );

  }



  const words =
    article.content?.split(" ").length || 0;


  const readingTime =
    Math.max(1, Math.ceil(words / 200));



  const related = articles
    .filter(
      (a) =>
        a.status === "published" &&
        a.id !== article.id &&
        a.category?.toLowerCase() ===
        article.category?.toLowerCase()
    )
    .slice(0,4);



  return (

    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">


      <p className="text-sm uppercase text-gray-500">
        {article.category}
      </p>



      <h1 className="text-3xl sm:text-5xl font-bold mt-3">
        {article.title}
      </h1>




      <div className="text-sm text-gray-500 mt-4 flex flex-wrap gap-2">


        <span>

          By{" "}

          <Link
            href={`/author/${encodeURIComponent(article.author)}`}
            className="underline hover:text-black"
          >
            {article.author}
          </Link>

        </span>


        <span>•</span>

        <span>
          {article.createdAt}
        </span>


        <span>•</span>

        <span>
          {article.views || 0} views
        </span>


        <span>•</span>

        <span>
          {readingTime} min read
        </span>


      </div>




      {article.coverImage && (

        <img
          src={article.coverImage}
          alt={article.title}
          loading="lazy"
          className="w-full mt-8 rounded-xl max-h-[450px] object-cover"
        />

      )}






      <p className="mt-8 text-lg text-gray-700 leading-relaxed">

        {article.summary}

      </p>




      <div className="mt-8 text-lg leading-8 whitespace-pre-line">

        {article.content}

      </div>






      {related.length > 0 && (

        <section className="mt-12 border-t pt-8">


          <h2 className="text-xl font-bold mb-5">
            Related Articles
          </h2>



          <div className="grid gap-4">


            {related.map((item) => (

              <Link

                key={item.id}

                href={`/articles/${item.slug}`}

                className="border rounded-lg p-4 hover:shadow"

              >

                <h3 className="font-semibold">
                  {item.title}
                </h3>


                <p className="text-sm text-gray-500">
                  {item.summary}
                </p>


              </Link>

            ))}


          </div>


        </section>

      )}



    </main>

  );

}