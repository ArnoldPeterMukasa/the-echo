import { Metadata } from "next";
import ArticleClient from "./ArticleClient";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

async function getArticle(slug: string) {
  try {
    const baseUrl =
      process.env.NEXTAUTH_URL ||
      "https://the-echo-rust.vercel.app";

    const response = await fetch(
      `${baseUrl}/api/articles`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const articles = await response.json();

    return (
      articles.find(
        (article: any) =>
          article.slug === slug
      ) || null
    );

  } catch {

    return null;

  }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const { slug } = await params;

  const article =
    await getArticle(slug);

  if (!article) {

    return {

      title: "Article Not Found",

      description:
        "The requested article could not be found.",

    };

  }

  const url =
    `https://the-echo-rust.vercel.app/articles/${article.slug}`;

  return {

    title: article.title,

    description:
      article.excerpt,

    alternates: {
      canonical: url,
    },

    openGraph: {

      title: article.title,

      description:
        article.excerpt,

      url,

      siteName:
        "The Echo Magazine",

      type: "article",

      images: article.coverImage
        ? [
            {
              url: article.coverImage,
            },
          ]
        : [],

    },

    twitter: {

      card: "summary_large_image",

      title: article.title,

      description:
        article.excerpt,

      images:
        article.coverImage
          ? [article.coverImage]
          : [],

    },

  };

}

export default async function Page() {

  return <ArticleClient />;

}