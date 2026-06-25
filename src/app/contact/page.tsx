export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">

      <h1 className="text-5xl font-bold mb-6">
        Contact Us
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        Have a story, project, event, or announcement you would
        like featured in The Echo?
      </p>

      <div className="space-y-4">

        <div>
          <h2 className="font-semibold">
            Editorial Team
          </h2>

          <p className="text-gray-600">
            editorial@theecho.net
          </p>
        </div>

        <div>
          <h2 className="font-semibold">
            General Inquiries
          </h2>

          <p className="text-gray-600">
            contact@theecho.net
          </p>
        </div>

      </div>

    </main>
  );
}