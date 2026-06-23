import Link from "next/link";

const categories = [
  "Campus Life",
  "Technology",
  "Academics",
  "Sports",
  "Projects",
];

export default function CategorySection() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">
        Explore Categories
      </h2>

      <div className="grid md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            key={category}
            href="/articles"
            className="border rounded-lg p-6 text-center hover:shadow-md transition"
          >
            <h3 className="font-semibold">{category}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}