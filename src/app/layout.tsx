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
    "breaking news",
    "articles",
    "community stories",

  ],


  authors: [

    {
      name: "The Echo Magazine",
    },

  ],


  creator:
    "The Echo Magazine",



  metadataBase: new URL(
    "https://YOUR-DOMAIN-HERE.com"
  ),



  alternates: {

    canonical: "/",

  },



  robots: {

    index: true,

    follow: true,

    googleBot: {

      index: true,

      follow: true,

      "max-image-preview": "large",

      "max-snippet": -1,

      "max-video-preview": -1,

    },

  },



  openGraph: {

    title:
      "The Echo Magazine",

    description:
      "Echoing reality of thousands through stories that matter.",

    url:
      "https://the-echo-rust.vercel.app",

    siteName:
      "The Echo Magazine",

    locale:
      "en_US",

    type:
      "website",

  },



  twitter: {

    card:
      "summary_large_image",

    title:
      "The Echo Magazine",

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