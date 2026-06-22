import ArticleCard from "@/src/components/ArticleCard";
import { articles } from "@/src/data/articles";
export default function ArticlePage(){
    return (
        <main className="p-10">
            <h1 className="text-4xl font-bold mb-8">
                Articles
            </h1>
            <div className="space-y-4">
                {articles.map((article)=>(
                    <ArticleCard
                    key={article.id}
                    title={article.title}
                    excerpt={article.excerpt}
                    slug={article.slug}
                    />
                ))}
            </div>
        </main>
    );
}