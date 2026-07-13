"use client";

export default function ScrollingBanner() {

  const headlines = [
    "THE ECHO Magazine launches new issue",
    "Breaking: New featured stories available",
    "Read exclusive interviews from our writers",
    "Submit your article for review today",
    "Discover trending stories",
  ];


  return (
    <section className="w-full overflow-hidden rounded-xl border bg-black text-white flex">

      {/* STATIC BRAND BOX */}
      <div className="
        bg-yellow-400
        text-black
        px-5
        py-3
        font-extrabold
        tracking-wide
        flex
        items-center
        z-10
      ">
        THE ECHO
      </div>


      {/* MOVING HEADLINES */}
      <div className="overflow-hidden flex-1"> //relative to be added at the end...

        <div className="
        flex 
        whitespace-nowrap 
        animate-scroll 
        py-3
      ">

          {headlines.map((headline, index) => (

            <span
              key={index}
              className="mx-8 text-sm sm:text-base"
            >
              {headline}
            </span>

          ))}

        </div>

      </div>


    </section>

);
}