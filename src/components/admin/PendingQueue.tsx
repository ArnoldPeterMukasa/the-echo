"use client";

import { useArticleStore } from "@/src/store/articleStore";
import Link from "next/link";

export default function PendingQueue() {

  const {
    articles,
    updateArticle,
  } = useArticleStore();


  const pending = articles.filter(
    (article) => article.status === "pending"
  );


  if (pending.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No pending articles to review
      </div>
    );
  }


  return (
    <div className="space-y-6">


      {pending.map((article)=>(

        <div
          key={article.id}
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
            By {article.author} • {article.createdAt}
          </p>



          <p className="mt-4 text-gray-700">
            {article.summary}
          </p>



          <p className="mt-4 text-gray-600 line-clamp-4">
            {article.content}
          </p>



          <div className="flex flex-wrap gap-3 mt-6">


            <button
              onClick={() =>
                updateArticle(article.id,{
                  status:"published",
                  role:"admin"
                })
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
              onClick={() =>
                updateArticle(article.id,{
                  status:"draft"
                })
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