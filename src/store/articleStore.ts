"use client";

import { create } from "zustand";

type Article = {
  id: string;
  title: string;
  summary: string; // ✅ consistent (replaces excerpt)
  content: string;
  category: string;
  author: string;
  coverImage?: string;

  slug: string;
  createdAt: string;

  status: "draft" | "pending" | "published";

  role?: "writer" | "admin";

  featured?: boolean;
  trending?: boolean;

  views?: number;
};

type Store = {
  articles: Article[];
  hydrated: boolean;

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  load: () => void;
  hydrate: () => void;

  addArticle: (article: Article) => void;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  getPublished: () => Article[];
  getDrafts: () => Article[];
  getPending: () => Article[];
  getTrending: () => Article[];
  getFeatured: () => Article | undefined;

  getFiltered: () => Article[];

  incrementViews: (id: string) => void;

  getTotalViews: () => number;
  getTopArticle: () => Article | undefined;
};

export const useArticleStore = create<Store>((set, get) => ({
  articles: [],
  hydrated: false,

  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),

  load: () => {
    const local = JSON.parse(localStorage.getItem("articles") || "[]");
    set({ articles: local });
  },

  hydrate: () => {
    const local = JSON.parse(localStorage.getItem("articles") || "[]");
    set({ articles: local, hydrated: true });
  },

  addArticle: (article) => {
    const updated = [article, ...get().articles];
    localStorage.setItem("articles", JSON.stringify(updated));
    set({ articles: updated });
  },

  updateArticle: (id, updates) => {
    const updated = get().articles.map((a) =>
      a.id === id ? { ...a, ...updates } : a
    );

    localStorage.setItem("articles", JSON.stringify(updated));
    set({ articles: updated });
  },

  deleteArticle: (id) => {
    const updated = get().articles.filter((a) => a.id !== id);
    localStorage.setItem("articles", JSON.stringify(updated));
    set({ articles: updated });
  },

  incrementViews: (id) => {
    const updated = get().articles.map((a) =>
      a.id === id
        ? { ...a, views: (a.views || 0) + 1 }
        : a
    );

    localStorage.setItem("articles", JSON.stringify(updated));
    set({ articles: updated });
  },

  getTotalViews: () =>
    get().articles.reduce((sum, a) => sum + (a.views || 0), 0),

  getTopArticle: () => {
    const published = get().articles.filter(
      (a) => a.status === "published"
    );

    if (!published.length) return undefined;

    return published.reduce((top, article) =>
      (article.views || 0) > (top.views || 0) ? article : top
    );
  },

  getPublished: () =>
    get().articles.filter((a) => a.status === "published"),

  getDrafts: () =>
    get().articles.filter((a) => a.status === "draft"),

  getPending: () =>
    get().articles.filter((a) => a.status === "pending"),

  getTrending: () =>
    get().articles
      .filter((a) => a.status === "published")
      .sort((a, b) => (b.views || 0) - (a.views || 0)),

  getFeatured: () => {
    const published = get().articles.filter(
      (a) => a.status === "published"
    );

    if (!published.length) return undefined;

    const scored = published.map((article) => {
      let score = 0;

      if (article.featured) score += 100;
      if (article.trending) score += 50;
      score += article.views || 0;

      const age =
        Date.now() - new Date(article.createdAt).getTime();

      const ageInDays = age / (1000 * 60 * 60 * 24);

      score += Math.max(30 - ageInDays, 0);

      return { ...article, score };
    });

    return scored.sort((a, b) => b.score - a.score)[0];
  },

  getFiltered: () => {
    const q = get().searchQuery.toLowerCase().trim();

    if (!q) return get().articles;

    return get().articles.filter((a) =>
      a.title?.toLowerCase().includes(q) ||
      a.summary?.toLowerCase().includes(q) || // ✅ FIXED (was excerpt)
      a.category?.toLowerCase().includes(q) ||
      a.author?.toLowerCase().includes(q)
    );
  },
}));