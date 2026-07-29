"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


type Article = {

  _id: string;

  title: string;

  slug: string;

  excerpt: string;

  category: string;

  coverImage?: string;

  views?: number;

  status:
    | "draft"
    | "pending"
    | "published";


  author?: {

    firstName: string;

    lastName: string;

    image?: string;

  };

};





export default function ArticlesPage() {


  const [articles, setArticles] =
    useState<Article[]>([]);


  const [loading, setLoading] =
    useState(true);




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

      <main className="
        max-w-6xl
        mx-auto
        px-6
        py-16
      ">

        <p className="text-gray-500 text-center">

          Loading magazine articles...

        </p>


      </main>

    );


  }







  return (

    <main className="
      max-w-6xl
      mx-auto
      px-6
      py-12
    ">



      <h1 className="
        text-4xl
        font-bold
        mb-10
      ">

        Magazine Articles

      </h1>







      {articles.length === 0 ? (


        <div className="
          text-center
          py-16
          text-gray-500
        ">

          No published articles yet.


        </div>



      ) : (



        <div className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        ">





          {articles.map((article)=>(



            <article

              key={article._id}

              className="
                border
                rounded-2xl
                overflow-hidden
                bg-white
                hover:shadow-xl
                transition
              "

            >




              <Link
                href={`/articles/${article.slug}`}
              >





                {article.coverImage ? (


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


                ) : (


                  <div className="
                    h-56
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                    text-gray-400
                  ">

                    No Image

                  </div>


                )}








                <div className="p-6">





                  <p className="
                    text-xs
                    uppercase
                    text-gray-500
                  ">

                    {article.category}

                  </p>







                  <h2 className="
                    text-xl
                    font-bold
                    mt-2
                  ">

                    {article.title}

                  </h2>







                  <p className="
                    text-gray-600
                    mt-3
                    line-clamp-3
                  ">

                    {article.excerpt}

                  </p>








                  <div className="
                    flex
                    items-center
                    gap-3
                    mt-5
                  ">




                    {article.author?.image ? (

                      <img

                        src={article.author.image}

                        alt="Author"

                        className="
                          w-8
                          h-8
                          rounded-full
                          object-cover
                        "

                      />


                    ) : null}





                    <p className="
                      text-sm
                      text-gray-500
                    ">


                      By{" "}

                      {article.author
                        ?
                        `${article.author.firstName} ${article.author.lastName}`
                        :
                        "Unknown"
                      }


                    </p>




                  </div>







                  <p className="
                    text-xs
                    text-gray-400
                    mt-3
                  ">

                    {article.views || 0} views

                  </p>





                </div>





              </Link>





            </article>




          ))}



        </div>




      )}





    </main>

  );

}