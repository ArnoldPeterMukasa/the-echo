import Link from "next/link";

type Props = {
  title: string;
  excerpt: string;
  slug?: string;
};

export default function ArticleCard({
  title,
  excerpt,
  slug,
}: Props) {
  return (
    <Link href={`/articles/${slug}`}>
      <div className="border rounded-lg p-5 hover:shadow-md transition">
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="text-gray-600 mt-2">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}