import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          The Echo
        </Link>

        {/* Nav */}
        <nav className="flex gap-6 text-sm text-gray-700">
          <Link href="/" className="hover:text-black">
            Home
          </Link>

          <Link href="/articles" className="hover:text-black">
            Articles
          </Link>

          <Link href="/about" className="hover:text-black">
            About
          </Link>

          <Link href="/contact" className="hover:text-black">
            Contact
          </Link>
        </nav>

      </div>
    </header>
  );
}