import Link from "next/link";
import Image from "next/image";

type Props = {
  articles: any[];
};

export default function LatestSection({ articles }: Props) {
  return (
    <section className="mb-16">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">
          Latest Articles
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="group border rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {/* Image */}
            <Image
              src={article.coverImage}
              alt={article.title}
              width={600}
              height={400}
              className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
            />

            {/* Content */}
            <div className="p-5">

              <p className="text-xs uppercase text-gray-500 mb-2">
                {article.category}
              </p>

              <h3 className="text-xl font-bold mb-3 group-hover:underline">
                {article.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {article.excerpt}
              </p>

              <div className="text-xs text-gray-400">
                By {article.author} • {article.createdAt}
              </div>

            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}