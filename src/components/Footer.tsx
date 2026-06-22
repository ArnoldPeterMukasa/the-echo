export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-500 flex justify-between">

        <p>© {new Date().getFullYear()} The Echo</p>

        <p>Echoing Reality of Thousands…</p>

      </div>
    </footer>
  );
}