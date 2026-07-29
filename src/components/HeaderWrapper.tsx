"use client";

import { usePathname } from "next/navigation";
import Header from "@/src/components/Header";

export default function HeaderWrapper() {

  const pathname = usePathname();


  // Cover page has its own design
  if (
    pathname === "/" ||
    pathname === "/cover"
  ) {
    return null;
  }


  return <Header />;

}