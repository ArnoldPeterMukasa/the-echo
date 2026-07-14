import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 bg-white border-b z-50">

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">


        <Link href="/home">

          <div>

            <h1 className="text-2xl font-bold">
              The Echo
            </h1>

            <p className="text-xs text-gray-500">
              Echoing Reality of Thousands...
            </p>

          </div>

        </Link>



        <nav className="flex gap-8 text-sm font-medium">


          <Link href="/home">
            Home
          </Link>


          <Link href="/articles">
            Articles
          </Link>


          <Link href="/dashboard">
            Dashboard
          </Link>


          <Link href="/about">
            About
          </Link>


          <Link href="/contact">
            Contact
          </Link>


        </nav>


      </div>

    </header>
  );
}