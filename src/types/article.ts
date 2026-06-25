export type ArticleStatus =
  | "draft"
  | "pending"
  | "published"
  | "rejected";


export type Article = {
  id: string;

  title: string;

  slug: string;

  excerpt: string;

  content: string;

  author: string;

  category: string;

  createdAt: string;

  coverImage: string;

  trending?: boolean;

  status: ArticleStatus;
};