"use client";

import { create } from "zustand";


type Article = {

  _id: string;

  id?: string;

  title: string;

  excerpt: string;

  content: string;

  category: string;

  coverImage?: string;

  slug: string;

  createdAt: string;

  status:
    | "draft"
    | "pending"
    | "published";


  author?: {

    firstName:string;

    lastName:string;

    image?:string;

  };


  views?: number;

  featured?: boolean;

  trending?: boolean;

};




type Store = {

  articles: Article[];

  loading:boolean;


  searchQuery:string;


  setSearchQuery:
  (q:string)=>void;


  fetchArticles:
  ()=>Promise<void>;


  getFiltered:
  ()=>Article[];


  getFeatured:
  ()=>Article | undefined;


  getTrending:
  ()=>Article[];


  incrementViews:
  (id:string)=>Promise<void>;

};






export const useArticleStore =
create<Store>((set,get)=>(



{


articles:[],


loading:false,


searchQuery:"",




setSearchQuery:(q)=>

set({

searchQuery:q

}),





fetchArticles:async()=>{


try{


set({

loading:true

});



const response =
await fetch(
"/api/articles"
);



const data =
await response.json();



set({

articles:data,

loading:false

});



}catch(error){


console.error(error);


set({

loading:false

});


}


},







getFiltered:()=>{


const {

articles,

searchQuery

}=get();



const q =
searchQuery
.toLowerCase()
.trim();



if(!q)

return articles;



return articles.filter(

(article)=>

article.title
.toLowerCase()
.includes(q)

||

article.excerpt
.toLowerCase()
.includes(q)

||

article.category
.toLowerCase()
.includes(q)

);



},







getFeatured:()=>{


const published =
get()
.articles
.filter(

(article)=>
article.status==="published"

);



if(!published.length)

return undefined;



return published.sort(

(a,b)=>

(b.views || 0)

-

(a.views || 0)

)[0];

},







getTrending:()=>{


return get()
.articles
.filter(

(article)=>

article.status==="published"

)

.sort(

(a,b)=>

(b.views || 0)

-

(a.views || 0)

);


},







incrementViews:
async(id)=>{


try{


await fetch(

`/api/articles/${id}/views`,

{

method:"PUT"

}

);



}catch(error){


console.error(error);


}


},



}

));