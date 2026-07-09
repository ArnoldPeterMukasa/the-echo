"use client";

import { useEffect } from "react";
import { useArticleStore } from "@/src/store/articleStore";
import PendingQueue from "@/src/components/admin/PendingQueue";

export default function AdminDashboard() {

  const { hydrate } = useArticleStore();


  useEffect(() => {
    hydrate();
  }, [hydrate]);


  return (
    <main className="max-w-6xl mx-auto px-6 py-10">


      <h1 className="text-4xl font-bold mb-8">
        Admin Review Panel
      </h1>


      <p className="text-gray-500 mb-6">
        Review submitted articles before publishing.
      </p>


      <PendingQueue />


    </main>
  );
}