
import "./globals.css";
import HeaderWrapper from "@/src/components/HeaderWrapper";
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

        <HeaderWrapper />

        <main className="flex-1">
          {children}
        </main>
        
        <Footer/>

      </body>
    </html>
  );
}
