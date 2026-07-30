import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {

  return {

    rules: {

      userAgent: "*",

      allow: "/",

    },

    sitemap:
      "https://the-echo-rust.vercel.app/sitemap.xml",

  };

}