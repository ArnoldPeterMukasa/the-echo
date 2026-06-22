import {articles} from "@/src/data/articles";
import {notFound} from "next/navigation";
type Props={
    params:{
        slug: string;
    };
};
export default function ArticlePage({params}: Props) {
    const article=articles.find(
        (a)=> a.slug === params.slug
    );
    if (!article){
        notFound();
    }
    return (
        <main className="max-w-3xl mx-auto p-10">
            <h1 className="text-5xl font-bold mb-4">
                {article.title}
            </h1>
            <p className="text-gray-500 mb-8">
                {article.author}
            </p>
            <article className="leading-8 text-lg">
                {article.content}
            </article>
        </main>
    );
}