"use client";

import { Search } from "lucide-react";
import { useArticleStore } from "@/src/store/articleStore";

export default function SearchBar() {

  const {
    searchQuery,
    setSearchQuery,
  } = useArticleStore();


  return (

    <div className="w-full">

      <div className="relative">


        <Search
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            w-5
            h-5
          "
        />


        <input

          type="text"

          value={searchQuery}

          onChange={(e) =>
            setSearchQuery(e.target.value)
          }

          placeholder="Search articles, categories, authors..."

          className="
            w-full
            pl-12
            pr-5
            py-3
            border
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-black
            transition
          "

        />


      </div>


    </div>

  );

}