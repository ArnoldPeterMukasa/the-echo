"use client";

import { useState } from "react";
import Link from "next/link";
import { useArticleStore } from "@/src/store/articleStore";


export default function SearchArticles() {

  const {
    articles
  } = useArticleStore();


  const [query,setQuery] = useState("");


  const filteredArticles = articles.filter((article)=>{

    if(article.status !== "published") return false;


    return (
      article.title
      .toLowerCase()
      .includes(query.toLowerCase())

      ||

      article.category
      .toLowerCase()
      .includes(query.toLowerCase())

      ||

      article.author
      .toLowerCase()
      .includes(query.toLowerCase())
    );

  });



  return (

    <section>


      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        className="
          w-full
          border
          rounded-lg
          px-5
          py-3
          mb-8
        "
      />



      <div className="grid md:grid-cols-3 gap-6">


        {filteredArticles.map((article)=>(


          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="
              border
              rounded-xl
              p-5
              hover:shadow
            "
          >


            <h2 className="font-bold text-xl">
              {article.title}
            </h2>


            <p className="text-sm text-gray-600 mt-3">
              {article.summary}
            </p>


            <p className="text-xs text-gray-400 mt-4">
              By {article.author}
            </p>


          </Link>


        ))}


      </div>


    </section>

  );
}