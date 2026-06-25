type Props = {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  coverImage: string;
};

export default function ArticlePreview({
  title,
  excerpt,
  content,
  author,
  category,
}: Props) {
  return (
    <div className="border rounded-xl p-6 mt-10">

      <p className="text-sm uppercase text-gray-500">
        {category || "Category"}
      </p>

      <h1 className="text-4xl font-bold mt-3">
        {title || "Article Title"}
      </h1>

      <p className="text-gray-600 mt-4">
        {excerpt || "Article excerpt"}
      </p>

      <p className="text-sm text-gray-400 mt-4">
        By {author || "Author"}
      </p>

      <hr className="my-6" />

      <div className="whitespace-pre-wrap">
        {content || "Article content preview"}
      </div>

    </div>
  );
}