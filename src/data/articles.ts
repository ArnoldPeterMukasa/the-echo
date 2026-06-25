import {Article} from "@/src/types/article";
export const articles: Article[] = [
    {
        id: "1",
        title: "Weclome to The Echo",
        slug: "welcome-to-the-echo",
        excerpt: "The Voice of the Core",
        content: "First Article of The Echo...",
        author: "admin",
        category: "Announcement",
        createdAt: "22-06-2026",
        trending:true,
        coverImage:"/images/hero.jpg",
        status: "published"
    },
    {
    id: "2",
    title: "Beginning Year Three",
    slug: "beginning-year-three",
    excerpt: "Reflections and expectations entering year three.",
    content: "As we enter year three...",
    author: "Editorial Team",
    category: "Campus Life",
    createdAt: "22-06-2026",
    trending: true,
    coverImage: "/images/campus.jpg",
    status: "published"
  },
];