"use client";

import { useEffect, useState } from "react";


type Advertisement = {

  _id: string;

  title: string;

  link?: string;

};




export default function ScrollingBanner() {


  const [ads, setAds] =
    useState<Advertisement[]>([]);




  useEffect(() => {


    async function loadAds() {


      try {


        const response =
          await fetch("/api/advertisements");



        if (!response.ok) {

          return;

        }



        const data =
          await response.json();



        if (Array.isArray(data)) {

          setAds(data);

        }



      } catch(error) {


        console.error(
          "Failed loading advertisements",
          error
        );


      }


    }



    loadAds();


  }, []);







  const defaults: Advertisement[] = [


    {

      _id:"default-1",

      title:"📰 THE ECHO Magazine launches new issue",

    },


    {

      _id:"default-2",

      title:"🔥 Breaking: New featured stories available",

    },


    {

      _id:"default-3",

      title:"🎙️ Read exclusive interviews",

    },


    {

      _id:"default-4",

      title:"✍️ Submit your article today",

    },


  ];







  const headlines: Advertisement[] =

    ads.length > 0

    ? ads

    : defaults;








  return (


    <section className="
      w-full
      overflow-hidden
      rounded-xl
      border
      bg-black
      text-white
      flex
    ">



      <div className="
        bg-yellow-400
        text-black
        px-5
        py-3
        font-bold
        shrink-0
        flex
        items-center
      ">

        THE ECHO

      </div>







      <div className="
        relative
        overflow-hidden
        flex-1
      ">



        <div className="
          flex
          whitespace-nowrap
          animate-scroll
          py-3
        ">



          {[...headlines, ...headlines].map(
            (headline,index)=>


              headline.link ? (


                <a

                  key={index}

                  href={headline.link}

                  target="_blank"

                  rel="noopener noreferrer"

                  className="
                    mx-8
                    hover:underline
                  "

                >

                  {headline.title}

                </a>


              ) : (


                <span

                  key={index}

                  className="mx-8"

                >

                  {headline.title}

                </span>


              )


          )}



        </div>



      </div>



    </section>


  );


}