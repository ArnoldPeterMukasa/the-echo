export default function NewsletterSection() {
  return (
    <section className="mt-16 border rounded-xl p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Stay Connected
      </h2>

      <p className="text-gray-600 mb-6">
        Receive updates from The Echo and never miss a story.
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        className="border rounded px-4 py-2 w-72"
      />

      <button className="ml-3 px-5 py-2 rounded bg-black text-white">
        Subscribe
      </button>
    </section>
  );
}