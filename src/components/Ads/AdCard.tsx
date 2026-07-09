"use client";

type AdCardProps = {
  title: string;
  description: string;
  image?: string;
  link?: string;
};

export default function AdCard({
  title,
  description,
  image,
  link,
}: AdCardProps) {
  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow-sm">

      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="text-gray-600 mt-2">
          {description}
        </p>


        {link && (
          <a
            href={link}
            target="_blank"
            className="inline-block mt-4 px-4 py-2 bg-black text-white rounded"
          >
            Learn More
          </a>
        )}

      </div>

    </div>
  );
}