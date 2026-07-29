"use client";

import { useEffect, useState } from "react";

type Advertisement = {
  _id: string;
  title: string;
};

export default function ScrollingBanner() {
  const [ads, setAds] = useState<Advertisement[]>([]);

  useEffect(() => {
    async function loadAds() {
      try {
        const response = await fetch("/api/advertisements");

        if (response.ok) {
          const data = await response.json();
          setAds(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadAds();
  }, []);

  const defaults = [
    "📰 THE ECHO Magazine launches new issue",
    "🔥 Breaking: New featured stories available",
    "🎙️ Read exclusive interviews",
    "✍️ Submit your article today",
  ];

  const headlines =
    ads.length > 0
      ? ads.map((ad) => ad.title)
      : defaults;

  return (
    <section className="w-full overflow-hidden rounded-xl border bg-black text-white flex">

      <div className="bg-yellow-400 text-black px-5 py-3 font-bold shrink-0">
        THE ECHO
      </div>

      <div className="relative overflow-hidden flex-1">

        <div className="flex whitespace-nowrap animate-scroll py-3">

          {[...headlines, ...headlines].map((headline, index) => (
            <span
              key={index}
              className="mx-8"
            >
              {headline}
            </span>
          ))}

        </div>

      </div>

    </section>
  );
}