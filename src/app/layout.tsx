import "./globals.css";

import Providers from "@/src/components/Providers";
import HeaderWrapper from "@/src/components/HeaderWrapper";
import Footer from "@/src/components/Footer";
import { AuthProvider } from "@/src/context/AuthContext";


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

        <Providers>

          <AuthProvider>

            <HeaderWrapper />

            <main className="flex-1">
              {children}
            </main>

            <Footer />

          </AuthProvider>

        </Providers>

      </body>

    </html>
  );
}




