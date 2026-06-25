import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <h2 className="text-2xl font-bold">
              The Echo
            </h2>

            <p className="text-gray-600 mt-3">
              Echoing Reality of Thousands...
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Navigation
            </h3>

            <div className="flex flex-col gap-2">
              <Link href="/">Home</Link>
              <Link href="/articles">Articles</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Publication
            </h3>

            <p className="text-gray-600">
              Student-driven magazine focused on stories,
              technology, academics and campus life.
            </p>
          </div>

        </div>

        <div className="border-t mt-8 pt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} The Echo. All rights reserved.
        </div>

      </div>
    </footer>
  );
}