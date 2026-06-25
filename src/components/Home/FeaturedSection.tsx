import Link from "next/link";
import Image from "next/image";

type Props = {
  featured: any;
};

export default function FeaturedSection({ featured }: Props) {
  return (
    <section className="mb-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* Image */}
        <div>
          <Image
            src={featured.coverImage}
            alt={featured.title}
            fill
            priority
            className="rounded-xl w-full h-[400px] object-cover"
          />
        </div>

        {/* Content */}
        <div>

          <p className="text-sm uppercase text-gray-500 mb-3">
            Featured Story
          </p>

          <Link href={`/articles/${featured.slug}`}>
            <h1 className="text-5xl font-bold leading-tight hover:underline">
              {featured.title}
            </h1>
          </Link>

          <p className="text-gray-600 text-lg mt-6">
            {featured.excerpt}
          </p>

          <div className="mt-6 text-sm text-gray-400">
            By {featured.author} • {featured.createdAt}
          </div>

        </div>

      </div>
    </section>
  );
}