"use client";

import Link from "next/link";

export default function CoverPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background */}
      <img
        src="https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/your-cover-image.jpg"
        alt="The Echo Cover"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />

      <div className="relative z-10 flex h-screen flex-col justify-center items-center text-center px-6">

        <p className="text-yellow-400 tracking-[0.5em] uppercase text-sm">
          Uganda's Student Magazine
        </p>

        <h1 className="mt-4 text-6xl md:text-8xl font-black">
          THE ECHO
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          Stories. Innovation. Leadership. Culture. Voices that matter.
        </p>

        <Link
          href="/"
          className="mt-10 bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition"
        >
          Enter Magazine →
        </Link>

      </div>

    </main>
  );
}