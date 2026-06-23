import Link from "next/link";
import { articles } from "@/src/data/articles";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = articles.find(
    (article) => article.slug === slug
  );

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">

      {/* Category */}
      <div className="mb-4">
        <span className="text-sm uppercase text-gray-500">
          {article.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold leading-tight mb-4">
        {article.title}
      </h1>

      {/* Author */}
      <div className="text-gray-500 mb-10">
        By {article.author} • {article.createdAt}
      </div>

      {/* Content */}
      <article className="text-lg leading-9 text-gray-800">
        {article.content}
      </article>

      {/* Back */}
      <div className="mt-12">
        <Link
          href="/articles"
          className="text-blue-600 hover:underline"
        >
          ← Back to Articles
        </Link>
      </div>

      {/* Related Articles */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold mb-6">
          Related Stories
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {relatedArticles.map((related) => (
            <Link
              key={related.id}
              href={`/articles/${related.slug}`}
              className="border rounded-lg p-5 hover:shadow-md transition"
            >
              <h3 className="font-bold mb-2">
                {related.title}
              </h3>

              <p className="text-sm text-gray-600">
                {related.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}