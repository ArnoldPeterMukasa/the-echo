"use client";

import { usePathname } from "next/navigation";
import Header from "@/src/components/Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  if (pathname === "/cover") {
    return null;
  }

  return <Header />;
}