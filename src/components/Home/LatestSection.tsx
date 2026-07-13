"use client";

import Link from "next/link";

export default function LatestSection({
  articles,
}: {
  articles: any[];
}) {
  return (
    <section className="mt-10">

      <h2 className="text-2xl font-bold mb-4">
        Latest Articles
      </h2>


      <div className="space-y-4">

        {articles.map((a) => (

          <Link
            key={a.id}
            href={`/articles/${a.slug}`}
            className="
              block
              border
              p-4
              rounded-xl
              hover:shadow-md
              transition
            "
          >


            <div className="flex gap-4">


              {/* IMAGE */}
              {a.coverImage && (
                <img
                  src={a.coverImage}
                  alt={a.title}
                  className="
                    w-32
                    h-24
                    object-cover
                    rounded-lg
                  "
                />
              )}



              <div className="flex-1">


                <p className="
                  text-xs
                  uppercase
                  text-gray-500
                ">
                  {a.category}
                </p>



                <h3 className="
                  font-bold
                  text-lg
                  mt-1
                ">
                  {a.title}
                </h3>



                <p className="
                  text-sm
                  text-gray-600
                  mt-2
                  line-clamp-2
                ">
                  {a.summary}
                </p>



                <p className="
                  text-xs
                  text-gray-400
                  mt-2
                ">
                  By {a.author}
                </p>


              </div>


            </div>


          </Link>

        ))}

      </div>

    </section>
  );
}