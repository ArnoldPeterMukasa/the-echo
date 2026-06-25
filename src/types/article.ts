export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
  trending?: boolean;
  coverImage: string;
};