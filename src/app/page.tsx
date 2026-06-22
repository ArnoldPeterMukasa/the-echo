import Hero from "@/src/components/Hero";
import ArticleCard from "@/src/components/ArticleCard";
import {articles} from "@/src/data/articles";

export default function Home(){
  return(
    <main style={{padding: "40px", fontFamily: "Arial"}}>
      <Hero/>
      <h2 style={{marginTop: "40px"}}>Latest Articles</h2>
      <div style={{display: "grid", gap: "12px", marginTop: "20px"}}>
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