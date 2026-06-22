import { articles } from "@/src/data/articles";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export default function ArticlePage({ params }: Props) {
  const article = articles.find(
    (a) => a.slug === params.slug
  );

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">

      {/* CATEGORY */}
      <p className="text-sm text-gray-500 uppercase mb-2">
        {article.category}
      </p>

      {/* TITLE */}
      <h1 className="text-4xl font-bold leading-tight">
        {article.title}
      </h1>

      {/* META */}
      <p className="text-sm text-gray-400 mt-2">
        By {article.author} • {article.createdAt}
      </p>

      <hr className="my-6" />

      {/* CONTENT */}
      <article className="text-lg leading-8 text-gray-800">
        {article.content}
      </article>

      {/* BACK */}
      <div className="mt-10">
        <a
          href="/"
          className="text-blue-600 hover:underline"
        >
          ← Back to Home
        </a>
      </div>

    </main>
  );
}