import "./globals.css";

import Providers from "@/src/components/Providers";
import HeaderWrapper from "@/src/components/HeaderWrapper";
import Footer from "@/src/components/Footer";
import { AuthProvider } from "@/src/context/AuthContext";


export const metadata = {
  title: {
    default: "The Echo Magazine",
    template: "%s | The Echo Magazine",
  },

  description:
    "The Echo Magazine — Echoing reality of thousands through news, stories, opinions and voices that matter.",

  keywords: [
    "The Echo Magazine",
    "Uganda news",
    "African stories",
    "journalism",
    "opinions",
    "articles",
  ],

  authors: [
    {
      name: "The Echo Magazine",
    },
  ],

  verification: {
    google:
      "6jFjYuaVh_uPadxC7Ynh9F8zWmzlamLW7U8FXWxzR9k",
  },

  openGraph: {
    title: "The Echo Magazine",
    description:
      "Echoing reality of thousands through stories that matter.",
    type: "website",
    siteName: "The Echo Magazine",
  },

  twitter: {
    card: "summary_large_image",
    title: "The Echo Magazine",
    description:
      "Echoing reality of thousands through stories that matter.",
  },
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