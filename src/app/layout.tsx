
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export const metadata = {
  title: "The Echo",
  description: "Echoing Reality of Thousands...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">

        <Header />

        <main className="flex-1">
          {children}
        </main>
        <Footer/>

      </body>
    </html>
  );
}
