"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


type Article = {

  _id: string;

  title: string;

  slug: string;

  summary: string;

  category: string;

  coverImage?: string;

  views?: number;

  status: string;

  author?: {

    firstName: string;

    lastName: string;

    image?: string;

  };

};



export default function ArticlesPage() {


  const [articles, setArticles] = useState<Article[]>([]);

  const [loading, setLoading] = useState(true);




  useEffect(()=>{


    async function loadArticles(){


      try {


        const response =
          await fetch(
            "/api/articles"
          );


        const data =
          await response.json();



        const published =
          data.filter(
            (article: Article)=>
              article.status === "published"
          );



        setArticles(published);



      } catch(error){


        console.error(
          "Failed loading articles",
          error
        );


      } finally {


        setLoading(false);


      }


    }



    loadArticles();



  },[]);





  if(loading){


    return (

      <main className="max-w-6xl mx-auto px-6 py-10">

        <p className="text-gray-500">

          Loading articles...

        </p>

      </main>

    );

  }





  return (

    <main className="max-w-6xl mx-auto px-6 py-10">



      <h1 className="text-4xl font-bold mb-8">

        Magazine Articles

      </h1>





      {articles.length === 0 ? (


        <p className="text-gray-500">

          No published articles yet.

        </p>



      ) : (



        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">



          {articles.map((article)=>(



            <article

              key={article._id}

              className="
              border
              rounded-xl
              overflow-hidden
              hover:shadow-lg
              transition
              "

            >



              <Link href={`/articles/${article.slug}`}>




                {article.coverImage && (


                  <img

                    src={article.coverImage}

                    alt={article.title}

                    loading="lazy"

                    className="
                    w-full
                    h-56
                    object-cover
                    "

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


                    By{" "}

                    {article.author
                      ? `${article.author.firstName} ${article.author.lastName}`
                      : "Unknown"
                    }


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