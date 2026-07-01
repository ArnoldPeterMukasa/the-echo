"use client";

import { useArticleStore } from "@/src/store/articleStore";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useArticleStore();

  return (
    <div className="w-full mb-6">

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search articles, categories, authors..."
        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
      />

    </div>
  );
}