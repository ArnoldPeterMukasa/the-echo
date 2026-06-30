"use client";

import { create } from "zustand";

type Article = any;

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

  incrementViews: (id) => {  //views traking
    const updated = get().articles.map((a) =>
      a.id === id ? { ...a, views: (a.views || 0) + 1 } : a
    );

    localStorage.setItem("articles", JSON.stringify(updated));
    set({ articles: updated });
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

    return published.sort(
      (a, b) => (b.views || 0) - (a.views || 0)
    )[0];
  },

  getFiltered: () => {
    const q = get().searchQuery.toLowerCase().trim();

    if (!q) return get().articles;

    return get().articles.filter((a) => {
      return (
        a.title?.toLowerCase().includes(q) ||
        a.excerpt?.toLowerCase().includes(q) ||
        a.category?.toLowerCase().includes(q) ||
        a.author?.toLowerCase().includes(q)
      );
    });
  },

  getTotalViews: () => {
    return get().articles.reduce(
      (sum, a) => sum + (a.views || 0),
      0
    );
  },

  getTopArticle: ()=>{
    return get().articles
    .filter((a)=> a.status === "published")
    .sort((a, b) => (b.views || 0) - (a.views || 0))[0];
  },
}));