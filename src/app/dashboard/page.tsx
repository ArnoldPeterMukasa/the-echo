// WRITER DASHBOARD PAGE
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Analytics from "@/src/components/dashboard/Analytics";


type Filter =
  | "all"
  | "published"
  | "pending"
  | "draft";


export default function DashboardPage() {


  const {
    data: session,
    status
  } = useSession();


  const router = useRouter();



  const [articles, setArticles] = useState<any[]>([]);

  const [mounted, setMounted] = useState(false);

  const [filter, setFilter] =
    useState<Filter>("all");




  useEffect(() => {


    if (status === "loading") return;



    if (!session) {

      router.push("/auth/writer/login");

      return;

    }



    if (session.user.role === "admin") {

      router.push("/dashboard/admin");

      return;

    }



    if (session.user.role !== "writer") {

      router.push("/auth");

      return;

    }




    async function loadArticles(){


      try {


        const response =
          await fetch("/api/articles");


        const data =
          await response.json();


        setArticles(data);



      } catch(error){

        console.error(error);

      }



      setMounted(true);


    }



    loadArticles();



  }, [
    status,
    session,
    router
  ]);






  async function deleteArticle(id:string){


    await fetch(
      `/api/articles/${id}`,
      {
        method:"DELETE",
      }
    );


    setArticles((prev)=>
      prev.filter(
        (article)=>
          article._id !== id
      )
    );


  }







  async function submitReview(id:string){


    await fetch(

      `/api/articles/${id}`,

      {

        method:"PUT",

        headers:{
          "Content-Type":
            "application/json",
        },


        body:JSON.stringify({

          status:"pending",

        }),

      }

    );



    setArticles((prev)=>

      prev.map((article)=>

        article._id === id

        ? {
            ...article,
            status:"pending"
          }

        : article

      )

    );


  }







  if(status === "loading"){


    return (

      <main className="p-10 text-center text-gray-500">

        Checking login...

      </main>

    );

  }





  if(!session){

    return null;

  }





  if(!mounted){


    return (

      <main className="p-10 text-center text-gray-500">

        Loading dashboard...

      </main>

    );

  }







  const filteredArticles =
    articles.filter((article)=>{


      if(filter === "all")
        return true;


      return article.status === filter;


    });





  const count = {


    all:
      articles.length,


    published:
      articles.filter(
        (a)=>
          a.status === "published"
      ).length,


    pending:
      articles.filter(
        (a)=>
          a.status === "pending"
      ).length,


    draft:
      articles.filter(
        (a)=>
          a.status === "draft"
      ).length,


  };






  return (

    <main className="max-w-7xl mx-auto px-6 py-10">


      <div className="flex justify-between items-center mb-8">


        <h1 className="text-4xl font-bold">

          Writer Dashboard

        </h1>



        <Link

          href="/dashboard/new"

          className="
          px-5
          py-3
          bg-black
          text-white
          rounded-lg
          "

        >

          + New Article

        </Link>


      </div>





      <Analytics />





      <div className="flex gap-3 mb-6 flex-wrap">


        {(["all","published","pending","draft"] as Filter[])
        .map((key)=>(


          <button

            key={key}

            onClick={()=>
              setFilter(key)
            }

            className={`

              px-4

              py-2

              rounded

              border

              ${
                filter === key
                ? "bg-black text-white"
                : ""
              }

            `}

          >

            {key} ({count[key]})


          </button>


        ))}


      </div>







      <div className="overflow-x-auto border rounded-xl">


        <table className="min-w-full">


          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-4 text-left">
                Cover
              </th>

              <th className="px-5 py-4 text-left">
                Title
              </th>

              <th className="px-5 py-4 text-left">
                Category
              </th>

              <th className="px-5 py-4 text-left">
                Status
              </th>

              <th className="px-5 py-4 text-left">
                Views
              </th>

              <th className="px-5 py-4 text-left">
                Date
              </th>

              <th className="px-5 py-4 text-left">
                Actions
              </th>


            </tr>


          </thead>






          <tbody>


          {filteredArticles.map((article)=>(


            <tr

              key={article._id}

              className="border-t"

            >


              <td className="px-5 py-4">


                {article.coverImage ? (

                  <img

                    src={article.coverImage}

                    alt={article.title}

                    className="
                    w-20
                    h-14
                    object-cover
                    rounded
                    "

                  />

                ):(

                  <div className="
                  w-20
                  h-14
                  bg-gray-200
                  rounded
                  "/>

                )}


              </td>





              <td className="px-5 py-4">


                <p className="font-semibold">

                  {article.title}

                </p>



                <p className="text-xs text-gray-500">

                  {article.author?.firstName
                    ?
                    `${article.author.firstName} ${article.author.lastName}`
                    :
                    "Unknown"
                  }

                </p>


              </td>





              <td className="px-5 py-4">

                {article.category}

              </td>




              <td className="px-5 py-4">


                <span className="
                text-xs
                px-3
                py-1
                rounded
                bg-gray-100
                ">

                  {article.status}

                </span>


              </td>





              <td className="px-5 py-4">

                {article.views || 0}

              </td>




              <td className="px-5 py-4">

                {new Date(article.createdAt)
                .toISOString()
                .split("T")[0]}

              </td>





              <td className="px-5 py-4 flex gap-2">



                <Link

                  href={`/dashboard/edit/${article._id}`}

                  className="
                  px-3
                  py-1
                  border
                  rounded
                  "

                >

                  Edit

                </Link>





                {article.status === "draft" && (


                  <button

                    onClick={()=>
                      submitReview(article._id)
                    }

                    className="
                    px-3
                    py-1
                    bg-yellow-600
                    text-white
                    rounded
                    "

                  >

                    Submit Review

                  </button>


                )}






                <button

                  onClick={()=>
                    deleteArticle(article._id)
                  }

                  className="
                  px-3
                  py-1
                  bg-red-600
                  text-white
                  rounded
                  "

                >

                  Delete

                </button>



              </td>




            </tr>



          ))}


          </tbody>



        </table>



      </div>



    </main>

  );


}