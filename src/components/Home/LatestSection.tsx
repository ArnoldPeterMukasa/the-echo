import Link from "next/link";

type Props = {
  articles: any[];
};

export default function LatestSection({ articles }: Props) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">
        Latest Articles
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article) => (
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
          </Link>
        ))}
      </div>
    </section>
  );
}