import SearchArticles from "@/src/components/articles/SearchArticles";

export default function ArticlesPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-10">
        All Articles
      </h1>

      <SearchArticles />

    </main>
  );
}