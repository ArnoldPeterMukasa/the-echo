import Link from "next/link";

const categories = [
  {
    name: "Campus Life",
    description: "Student experiences, events and memories.",
  },
  {
    name: "Technology",
    description: "Software, AI, innovation and development.",
  },
  {
    name: "Academics",
    description: "Learning, coursework and research.",
  },
  {
    name: "Sports",
    description: "Competitions, teams and achievements.",
  },
  {
    name: "Projects",
    description: "Student projects and showcases.",
  },
];

export default function CategorySection() {
  return (
    <section className="mb-16">

      <h2 className="text-3xl font-bold mb-8">
        Explore Categories
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">

        {categories.map((category) => (
          <Link
            key={category.name}
            href="/articles"
            className="border rounded-xl p-6 hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg mb-3">
              {category.name}
            </h3>

            <p className="text-sm text-gray-600">
              {category.description}
            </p>
          </Link>
        ))}

      </div>

    </section>
  );
}