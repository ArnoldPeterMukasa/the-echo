"use client";

import { useEffect, useState } from "react";


type Article = {

  _id:string;

  title:string;

  slug:string;

  summary:string;

  content:string;

  category:string;

  coverImage?:string;

  status:string;

  createdAt:string;

  author?:{

    firstName:string;

    lastName:string;

    image?:string;

  };

};



export default function PendingQueue(){


  const [articles,setArticles] =
    useState<Article[]>([]);


  const [loading,setLoading] =
    useState(true);


  const [action,setAction] =
    useState("");




  async function loadArticles(){


    try{


      const response =
        await fetch("/api/articles");


      const data =
        await response.json();



      const pending =
        data.filter(
          (article:Article)=>
            article.status === "pending"
        );


      setArticles(pending);



    }catch(error){


      console.error(error);


    }finally{


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


    setAction(id);



    try{


      await fetch(
        `/api/articles/${id}`,
        {

          method:"PUT",

          headers:{
            "Content-Type":
            "application/json"
          },


          body:JSON.stringify({
            status
          })


        }
      );



      await loadArticles();



    }catch(error){


      console.error(error);


    }finally{


      setAction("");


    }


  }






  async function deleteArticle(
    id:string
  ){


    const confirmDelete =
      confirm(
        "Delete this article permanently?"
      );


    if(!confirmDelete)
      return;



    setAction(id);



    try{


      await fetch(
        `/api/articles/${id}`,
        {
          method:"DELETE"
        }
      );


      await loadArticles();



    }catch(error){


      console.error(error);


    }finally{


      setAction("");


    }


  }







  if(loading){

    return (

      <p className="text-center py-10 text-gray-500">

        Loading reviews...

      </p>

    );

  }







  if(!articles.length){

    return (

      <p className="text-center py-10 text-gray-500">

        No pending articles.

      </p>

    );

  }







  return (

    <div className="space-y-6">


      {articles.map(article=>(


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






          <p className="
          text-xs
          uppercase
          text-gray-500
          ">

            {article.category}

          </p>





          <h2 className="
          text-2xl
          font-bold
          mt-2
          ">

            {article.title}

          </h2>






          <p className="
          text-sm
          text-gray-500
          mt-2
          ">

            By{" "}

            {article.author
            ?
            `${article.author.firstName} ${article.author.lastName}`
            :
            "Unknown"
            }

          </p>






          <p className="
          mt-4
          text-gray-700
          ">

            {article.summary}

          </p>







          <div className="
          flex
          flex-wrap
          gap-3
          mt-6
          ">



            <button

              disabled={action===article._id}

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
              disabled:opacity-50
              "

            >

              {action===article._id
              ?
              "Updating..."
              :
              "Publish"
              }

            </button>






            <button

              disabled={action===article._id}

              onClick={()=>
                updateStatus(
                  article._id,
                  "draft"
                )
              }

              className="
              px-4
              py-2
              bg-yellow-600
              text-white
              rounded-lg
              "

            >

              Reject

            </button>







            <button

              onClick={()=>
                deleteArticle(
                  article._id
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

              Delete

            </button>



          </div>



        </div>


      ))}


    </div>

  );


}