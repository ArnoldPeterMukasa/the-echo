"use client";

import { useArticleStore } from "@/src/store/articleStore";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useArticleStore();

  return (
    <div className="mb-8">
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search articles..."
        className="w-full border rounded-lg px-4 py-3 outline-none"
      />
    </div>
  );
}