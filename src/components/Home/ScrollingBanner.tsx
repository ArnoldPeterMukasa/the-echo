"use client";

export default function ScrollingBanner() {

  const news = [
    "THE ECHO Magazine launches new issue",
    "Breaking: New featured stories available",
    "Read exclusive interviews from our writers",
    "Submit your article for review today",
    "Discover trending stories"
  ];


  return (
    <div className="flex overflow-hidden border rounded-xl bg-black text-white">


      {/* STATIC BRAND BOX */}

      <div className="bg-yellow-400 text-black px-5 py-3 font-bold whitespace-nowrap z-10">
        THE ECHO
      </div>



      {/* MOVING CONTENT */}

      <div className="relative overflow-hidden flex-1">

        <div className="animate-scroll whitespace-nowrap py-3">

          {news.map((item,index)=>(
            <span
              key={index}
              className="mx-8"
            >
              {item}
            </span>
          ))}

        </div>

      </div>


    </div>
  );
}