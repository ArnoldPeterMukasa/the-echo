import Link from "next/link";
import { articles } from "@/src/data/articles";
export default function TrendingSection(){
    const trending=articles.filter((a)=> a.trending);
    if(trending.length===0) return null;
    return(
        <section className="mt-12">
           <h2 className="text-2xl font-semibold mb-6">
            Trending Stories
            </h2>
            <div className="grid md:grid-cols-3 gap4">
                {trending.map((article)=>(
                    <Link
                    key={article.id}
                    href={'/articles/${article.slug}'}
                    className="border p-4 rounded hover:shadow-md transition"
                    >
                        <h3 className="font-bold">
                            {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                            {article.excerpt}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}