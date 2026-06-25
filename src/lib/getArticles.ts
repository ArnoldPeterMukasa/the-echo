import { articles as staticArticles } from "@/src/data/articles";

export function getArticles() {
  if (typeof window === "undefined") {
    return staticArticles;
  }

  const local = JSON.parse(
    localStorage.getItem("articles") || "[]"
  );

  const merged = [...local, ...staticArticles];

  // remove duplicates by id
  const uniqueMap = new Map();

  merged.forEach((article) => {
    uniqueMap.set(article.id, article);
  });

  return Array.from(uniqueMap.values());
}