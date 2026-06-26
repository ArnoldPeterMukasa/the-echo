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
};

export const useArticleStore = create<Store>((set, get) => ({
  articles: [],
  hydrated: false,
  searchQuery: "",

  load: () => {
    const local = JSON.parse(localStorage.getItem("articles") || "[]");
    set({ articles: local });
  },

  hydrate: () => {
    const local = JSON.parse(localStorage.getItem("articles") || "[]");
    set({ articles: local, hydrated: true });
  },

  setSearchQuery: (q) => {
    set({ searchQuery: q });
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

  getPublished: () =>
    get().articles.filter((a) => a.status === "published"),

  getDrafts: () =>
    get().articles.filter((a) => a.status === "draft"),

  getPending: () =>
    get().articles.filter((a) => a.status === "pending"),

  getTrending: () =>
    get().articles.filter(
      (a) => a.status === "published" && a.trending
    ),

  // ⭐ SINGLE CLEAN FEATURED ALGORITHM
  getFeatured: () => {
    const published = get().articles.filter(
      (a) => a.status === "published"
    );

    if (published.length === 0) return undefined;

    const scored = published.map((a) => ({
      ...a,
      score:
        (a.trending ? 3 : 0) +
        (a.featured ? 5 : 0) +
        new Date(a.createdAt).getTime() / 1000000,
    }));

    return scored.sort((a, b) => b.score - a.score)[0];
  },

  // 🔍 SEARCH (GLOBAL)
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
}));