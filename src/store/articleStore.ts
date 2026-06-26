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
  getFeatured: () => Article | undefined;
};

export const useArticleStore = create<Store>((set, get) => ({
  articles: [],
  hydrated: false,

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

  getPublished: () => {
    return get().articles.filter((a) => a.status === "published");
  },

  getDrafts: () => {
    return get().articles.filter((a) => a.status === "draft");
  },

  getPending: () => {
    return get().articles.filter((a) => a.status === "pending");
  },

  getTrending: () => {
    return get()
      .articles
      .filter((a) => a.status === "published")
      .sort((a, b) => {
        const score = (x: any) =>
          (x.trending ? 3 : 0) +
          new Date(x.createdAt).getTime();

        return score(b) - score(a);
      });
  },

  getFeatured: () => {
    const published = get().articles.filter(
      (a) => a.status === "published"
    );

    const sorted = [...published].sort((a, b) => {
      const score = (x: any) =>
        (x.trending ? 3 : 0) +
        (x.featured ? 5 : 0) +
        new Date(x.createdAt).getTime();

      return score(b) - score(a);
    });

    return sorted[0];
  },
}));