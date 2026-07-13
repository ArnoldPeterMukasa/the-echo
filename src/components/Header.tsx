import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 bg-white border-b z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/cover">
          <div>
            <h1 className="text-2xl font-bold">
              The Echo
            </h1>

            <p className="text-xs text-gray-500">
              Echoing Reality of Thousands...
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex gap-8 text-sm font-medium">

          <Link
            href="/dashboard" className="hover:text-gray-500 transition">
            Dashboard
          </Link>

          <Link
            href="/cover"
            className="hover:text-gray-500 transition"
          >
            Home

          </Link>

          <Link
            href="/articles"
            className="hover:text-gray-500 transition"
          >
            Articles
          </Link>

          <Link
            href="/about"
            className="hover:text-gray-500 transition"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="hover:text-gray-500 transition"
          >
            Contact
          </Link>

        </nav>
      </div>
    </header>
  );
}