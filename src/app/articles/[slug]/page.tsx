"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";


type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage?: string;
  views?: number;
  status?: string;
  createdAt: string;

  author?: {
    _id: string;
    firstName: string;
    lastName: string;
    image?: string;
  };
};



export default function ArticlePage() {

  const { slug } = useParams();


  const [article, setArticle] =
    useState<Article | null>(null);


  const [related, setRelated] =
    useState<Article[]>([]);


  const [loading, setLoading] =
    useState(true);



  useEffect(() => {


    async function loadArticle() {

      try {


        const response =
          await fetch("/api/articles");


        const data =
          await response.json();



        const found =
          data.find(
            (item: Article) =>
              item.slug === slug
          );



        if (!found) {
          setArticle(null);
          return;
        }



        let updatedArticle = found;



        const viewed =
          sessionStorage.getItem(
            `viewed-${found._id}`
          );



        if (!viewed) {


          const viewResponse =
            await fetch(
              `/api/articles/${found._id}/views`,
              {
                method: "PUT",
              }
            );


          if(viewResponse.ok){

            const viewData =
              await viewResponse.json();


            updatedArticle = {
              ...found,
              views: viewData.views,
            };

          }


          sessionStorage.setItem(
            `viewed-${found._id}`,
            "true"
          );


        }



        setArticle(updatedArticle);



        const relatedArticles =
          data.filter(
            (item: Article) =>
              item.category === found.category &&
              item._id !== found._id &&
              item.status === "published"
          )
          .slice(0,4);



        setRelated(relatedArticles);



      } catch(error){

        console.error(
          "Failed loading article",
          error
        );


      } finally {

        setLoading(false);

      }

    }



    if(slug){

      loadArticle();

    }


  },[slug]);





  if(loading){

    return (

      <main className="max-w-3xl mx-auto px-6 py-16">

        <p className="text-gray-500 text-center">
          Loading article...
        </p>

      </main>

    );

  }





  if(!article){

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
    Math.max(
      1,
      Math.ceil(words / 200)
    );




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

          {article.author ? (

            <Link
              href={`/author/${article.author._id}`}
              className="underline hover:text-black"
            >

              {article.author.firstName}{" "}
              {article.author.lastName}

            </Link>

          ) : (
            "Unknown"
          )}

        </span>



        <span>•</span>


        <span>
          {new Date(article.createdAt)
            .toLocaleDateString()}
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
          className="
          w-full
          mt-8
          rounded-xl
          max-h-[450px]
          object-cover
          "
        />

      )}






      <p className="mt-8 text-lg text-gray-700 leading-relaxed">

        {article.excerpt}

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


            {related.map((item)=>(

              <Link

                key={item._id}

                href={`/articles/${item.slug}`}

                className="
                border
                rounded-lg
                p-4
                hover:shadow
                "

              >

                <h3 className="font-semibold">
                  {item.title}
                </h3>


                <p className="text-sm text-gray-500">
                  {item.excerpt}
                </p>


              </Link>

            ))}


          </div>


        </section>

      )}


    </main>

  );

}