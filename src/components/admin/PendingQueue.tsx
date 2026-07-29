"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


type Article = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  coverImage?: string;
  status: string;
  createdAt: string;
  author: {
    firstName: string;
    lastName: string;
    image?: string;
  };
};


export default function PendingQueue() {


  const [articles, setArticles] = useState<Article[]>([]);

  const [loading, setLoading] = useState(true);



  async function loadArticles(){

    try {

      const response = await fetch(
        "/api/articles"
      );


      const data = await response.json();


      const pendingArticles =
        data.filter(
          (article: Article)=>
            article.status === "pending"
        );


      setArticles(pendingArticles);


    } catch(error){

      console.error(
        "Failed loading articles",
        error
      );

    } finally {

      setLoading(false);

    }

  }



  useEffect(()=>{

    loadArticles();

  },[]);





  async function updateStatus(
    id:string,
    status:string
  ){

    try {


      await fetch(
        `/api/articles/${id}`,
        {

          method:"PUT",

          headers:{
            "Content-Type":"application/json",
          },

          body:JSON.stringify({
            status,
          }),

        }
      );


      loadArticles();


    } catch(error){

      console.error(error);

    }

  }





  if(loading){

    return (

      <div className="text-center py-10 text-gray-500">

        Loading reviews...

      </div>

    );

  }





  if(articles.length === 0){

    return (

      <div className="text-center text-gray-500 py-10">

        No pending articles to review

      </div>

    );

  }





  return (

    <div className="space-y-6">


      {articles.map((article)=>(


        <div

          key={article._id}

          className="
          border
          rounded-2xl
          p-6
          bg-white
          shadow-sm
          "

        >



          {article.coverImage && (

            <img

              src={article.coverImage}

              alt={article.title}

              className="
              w-full
              h-60
              object-cover
              rounded-xl
              mb-5
              "

            />

          )}




          <p className="text-xs uppercase text-gray-500">

            {article.category}

          </p>




          <h2 className="text-2xl font-bold mt-2">

            {article.title}

          </h2>




          <p className="text-sm text-gray-500 mt-2">

            By {article.author?.firstName}{" "}
            {article.author?.lastName}

          </p>




          <p className="mt-4 text-gray-700">

            {article.summary}

          </p>




          <p className="mt-4 text-gray-600 line-clamp-4">

            {article.content}

          </p>





          <div className="flex flex-wrap gap-3 mt-6">



            <button

              onClick={()=>
                updateStatus(
                  article._id,
                  "published"
                )
              }

              className="
              px-4
              py-2
              bg-green-600
              text-white
              rounded-lg
              "

            >

              Publish

            </button>





            <button

              onClick={()=>
                updateStatus(
                  article._id,
                  "draft"
                )
              }

              className="
              px-4
              py-2
              bg-red-600
              text-white
              rounded-lg
              "

            >

              Send Back

            </button>





            <Link

              href={`/articles/${article.slug}`}

              className="
              px-4
              py-2
              border
              rounded-lg
              "

            >

              Preview

            </Link>



          </div>



        </div>


      ))}


    </div>

  );

}