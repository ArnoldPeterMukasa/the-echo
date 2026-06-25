import { articles as staticArticles } from "@/src/data/articles";

export function getArticles() {
  if (typeof window === "undefined") {
    return staticArticles;
  }

  const local = JSON.parse(
    localStorage.getItem("articles") || "[]"
  );

  return [...staticArticles, ...local];
}