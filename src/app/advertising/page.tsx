"use client";

import AdCard from "@/src/components/Ads/AdCard";

export default function AdvertisingPage() {

  const adverts = [
    {
      title: "Advertise With The Echo",
      description:
        "Reach our readers through magazine adverts, sponsored stories and digital campaigns.",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72",
      link: "#",
    },

    {
      title: "Premium Magazine Placement",
      description:
        "Feature your brand on our homepage and news ticker.",
      image:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786",
      link: "#",
    },
  ];


  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-4">
        Advertise With The Echo
      </h1>


      <p className="text-gray-600 mb-10 max-w-2xl">
        Partner with The Echo magazine and reach a growing audience
        through digital advertising opportunities.
      </p>


      <div className="grid md:grid-cols-2 gap-8">

        {adverts.map((ad, index) => (
          <AdCard
            key={index}
            {...ad}
          />
        ))}

      </div>

    </main>
  );
}