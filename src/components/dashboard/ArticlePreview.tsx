type Props = {
  title: string;
  summary: string;
  content: string;
  author: string;
  category: string;
  coverImage: string;
};

export default function ArticlePreview({
  title,
  summary,
  content,
  author,
  category,
  coverImage,
}: Props) {
  return (
    <div className="border rounded-xl p-6 mt-10">


      <p className="text-sm uppercase text-gray-500">
        {category || "Category"}
      </p>



      <h1 className="text-4xl font-bold mt-3">
        {title || "Article Title"}
      </h1>



      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className="w-full mt-6 rounded-xl max-h-[350px] object-cover"
        />
      )}



      <p className="text-gray-600 mt-4">
        {summary || "Article summary"}
      </p>



      <p className="text-sm text-gray-400 mt-4">
        By {author || "Author"}
      </p>



      <hr className="my-6" />



      <div className="whitespace-pre-wrap leading-8">
        {content || "Article content preview"}
      </div>


    </div>
  );
}