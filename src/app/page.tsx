import Link from "next/link";
import { articles } from "@/src/data/articles";

export default function Home() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">

      {/* FEATURED */}
      <section className="mb-12">
        <p className="text-sm text-gray-500 uppercase">
          Featured Story
        </p>

        <Link href={`/articles/${featured.slug}`}>
          <h1 className="text-5xl font-bold mt-2 hover:underline">
            {featured.title}
          </h1>
        </Link>

        <p className="text-gray-600 mt-4 text-lg max-w-2xl">
          {featured.excerpt}
        </p>

        <p className="text-sm text-gray-400 mt-2">
          By {featured.author} • {featured.createdAt}
        </p>
      </section>

      {/* GRID */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Latest Articles
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="border rounded-lg p-5 hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold">
                {article.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {article.excerpt}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                {article.category}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}