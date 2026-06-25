import { create } from "zustand";

type Article = any;

type Store = {
  articles: Article[];
  hydrated: boolean;

  load: () => void;
  hydrate: () => void;

  addArticle: (article: Article) => void;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  getPublished: () => Article[];
  getDrafts: () => Article[];
  getPending: () => Article[];
  getTrending: () => Article[];
};

export const useArticleStore = create<Store>((set, get) => ({
  articles: [],
  hydrated: false,

  // 🔄 Load from localStorage (basic)
  load: () => {
    const local = JSON.parse(
      localStorage.getItem("articles") || "[]"
    );

    set({ articles: local });
  },

  // 🔄 Hydrate store (recommended)
  hydrate: () => {
    const local = JSON.parse(
      localStorage.getItem("articles") || "[]"
    );

    set({
      articles: local,
      hydrated: true,
    });
  },

  // ➕ Add article
  addArticle: (article) => {
    const updated = [article, ...get().articles];

    localStorage.setItem("articles", JSON.stringify(updated));
    set({ articles: updated });
  },

  // ✏️ Update article
  updateArticle: (id, updates) => {
    const updated = get().articles.map((a) =>
      a.id === id ? { ...a, ...updates } : a
    );

    localStorage.setItem("articles", JSON.stringify(updated));
    set({ articles: updated });
  },

  // ❌ Delete article
  deleteArticle: (id) => {
    const updated = get().articles.filter((a) => a.id !== id);

    localStorage.setItem("articles", JSON.stringify(updated));
    set({ articles: updated });
  },

  // 🟢 Published articles
  getPublished: () => {
    return get().articles.filter(
      (a) => a.status === "published"
    );
  },

  // 🟡 Drafts
  getDrafts: () => {
    return get().articles.filter(
      (a) => a.status === "draft"
    );
  },

  // 🟠 Pending review
  getPending: () => {
    return get().articles.filter(
      (a) => a.status === "pending"
    );
  },

  // 🔥 Trending articles
  getTrending: () => {
    return get().articles.filter(
      (a) => a.trending && a.status === "published"
    );
  },
}));