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
  getFeatured: () => Article;
};

export const useArticleStore = create<Store>((set, get) => ({
  articles: [],
  hydrated: false,

  // load from localStorage
  load: () => {
    const local = JSON.parse(localStorage.getItem("articles") || "[]");
    set({ articles: local });
  },

  // hydrate (recommended)
  hydrate: () => {
    const local = JSON.parse(localStorage.getItem("articles") || "[]");
    set({ articles: local, hydrated: true });
  },

  // add article
  addArticle: (article) => {
    const updated = [article, ...get().articles];
    localStorage.setItem("articles", JSON.stringify(updated));
    set({ articles: updated });
  },

  // update article
  updateArticle: (id, updates) => {
    const updated = get().articles.map((a) =>
      a.id === id ? { ...a, ...updates } : a
    );

    localStorage.setItem("articles", JSON.stringify(updated));
    set({ articles: updated });
  },

  // delete article
  deleteArticle: (id) => {
    const updated = get().articles.filter((a) => a.id !== id);
    localStorage.setItem("articles", JSON.stringify(updated));
    set({ articles: updated });
  },

  // published
  getPublished: () => {
    return get().articles.filter(
      (a) => a.status === "published"
    );
  },

  // drafts
  getDrafts: () => {
    return get().articles.filter(
      (a) => a.status === "draft"
    );
  },

  // pending
  getPending: () => {
    return get().articles.filter(
      (a) => a.status === "pending"
    );
  },

  // trending
  getTrending: () => {
    return get().articles.filter(
      (a) => a.trending && a.status === "published"
    );
  },

  // featured (auto-pick best article)
  getFeatured: () => {
    const published = get().articles.filter(
      (a) => a.status === "published"
    );

    const sorted = [...published].sort((a, b) => {
      const scoreA =
        (a.trending ? 2 : 0) +
        new Date(a.createdAt).getTime();

      const scoreB =
        (b.trending ? 2 : 0) +
        new Date(b.createdAt).getTime();

      return scoreB - scoreA;
    });

    return sorted[0];
  },
}));