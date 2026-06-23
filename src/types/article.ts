export type Article={
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    author: string;
    category: string;
    createdAt: string;
    featured?: boolean;
    trending?: boolean;
    coverImage?: string;
};