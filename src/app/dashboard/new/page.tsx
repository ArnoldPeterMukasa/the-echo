"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/src/lib/uploadImage";
import ArticlePreview from "@/src/components/dashboard/ArticlePreview";


export default function NewArticlePage() {


  const router = useRouter();


  const [title, setTitle] = useState("");

  const [summary, setSummary] = useState("");

  const [content, setContent] = useState("");

  const [category, setCategory] = useState("");

  const [coverImage, setCoverImage] = useState("");

  const [author, setAuthor] = useState("");

  const [featured, setFeatured] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [saving, setSaving] = useState(false);





  async function handleSubmit(
    status: "draft" | "pending"
  ) {


    if (
      !title.trim() ||
      !summary.trim() ||
      !content.trim()
    ) {

      alert(
        "Please complete title, summary and content"
      );

      return;

    }



    try {


      setSaving(true);



      const response =
        await fetch(
          "/api/articles",
          {

            method:"POST",

            headers:{

              "Content-Type":
                "application/json",

            },

            body:JSON.stringify({

              title,

              excerpt: summary,

              content,

              category:
                category || "General",

              coverImage,

              status,

              featured,

            }),

          }
        );



      if(!response.ok){

        throw new Error(
          "Article creation failed"
        );

      }



      router.push("/dashboard");



    } catch(error){


      console.error(error);


      alert(
        "Could not save article"
      );


    } finally {


      setSaving(false);


    }


  }






  return (

    <main className="max-w-3xl mx-auto px-6 py-12">


      <h1 className="text-4xl font-bold mb-8">

        Create Article

      </h1>





      <div className="space-y-4">



        <input

          className="w-full border p-3 rounded"

          placeholder="Article title"

          value={title}

          onChange={(e)=>
            setTitle(e.target.value)
          }

        />




        <input

          className="w-full border p-3 rounded"

          placeholder="Short summary"

          value={summary}

          onChange={(e)=>
            setSummary(e.target.value)
          }

        />





        <textarea

          className="w-full border p-3 rounded h-52"

          placeholder="Write your article here..."

          value={content}

          onChange={(e)=>
            setContent(e.target.value)
          }

        />





        <input

          className="w-full border p-3 rounded"

          placeholder="Category"

          value={category}

          onChange={(e)=>
            setCategory(e.target.value)
          }

        />






        <label className="flex items-center gap-3 border rounded p-3">


          <input

            type="checkbox"

            checked={featured}

            onChange={(e)=>
              setFeatured(
                e.target.checked
              )
            }

          />


          <span>
            Feature this article on homepage
          </span>


        </label>






        <div>


          <p className="font-semibold mb-2">

            Cover Image

          </p>



          <input

            type="file"

            accept="image/*"

            className="w-full border p-3 rounded"

            onChange={async(e)=>{


              const file =
                e.target.files?.[0];


              if(!file) return;



              try {


                setUploading(true);



                const url =
                  await uploadImage(file);



                setCoverImage(url);



              }catch{


                alert(
                  "Image upload failed"
                );


              }finally{


                setUploading(false);


              }


            }}

          />


        </div>





        {uploading && (

          <p className="text-sm text-gray-500">

            Uploading image...

          </p>

        )}






        {coverImage && (

          <img

            src={coverImage}

            alt="Cover"

            className="
            w-full
            rounded-lg
            max-h-[300px]
            object-cover
            "

          />

        )}







        <div className="flex gap-4 pt-5">



          <button


            disabled={saving}


            onClick={()=>
              handleSubmit("draft")
            }


            className="
            px-5
            py-2
            border
            rounded
            disabled:opacity-50
            "

          >

            Save Draft


          </button>






          <button


            disabled={saving}


            onClick={()=>
              handleSubmit("pending")
            }


            className="
            px-5
            py-2
            bg-black
            text-white
            rounded
            disabled:opacity-50
            "

          >

            {saving
              ? "Saving..."
              : "Submit For Review"
            }


          </button>




        </div>




      </div>






      <ArticlePreview

        title={title}

        summary={summary}

        content={content}

        author={author}

        category={category}

        coverImage={coverImage}

      />




    </main>

  );

}