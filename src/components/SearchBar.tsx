"use client";

import { useArticleStore } from "@/src/store/articleStore";

export default function SearchBar() {

  const {
    searchQuery,
    setSearchQuery,
  } = useArticleStore();


  return (
    <div className="w-full">

      <input
        type="text"
        value={searchQuery}
        onChange={(e) =>
          setSearchQuery(e.target.value)
        }
        placeholder="Search articles, categories, authors..."
        className="
          w-full
          px-5
          py-3
          border
          rounded-xl
          outline-none
          focus:ring-2
          focus:ring-black
        "
      />

    </div>
  );
}