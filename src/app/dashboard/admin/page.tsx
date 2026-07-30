"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminActivityLogs from "@/src/components/admin/AdminActivityLogs";

import PendingQueue from "@/src/components/admin/PendingQueue";


export default function AdminDashboard() {

  const {
    data: session,
    status,
  } = useSession();


  const router = useRouter();


  useEffect(() => {

    if (status === "loading") {
      return;
    }


    if (!session) {

      router.push("/auth/admin");

      return;

    }



    if (session.user.role !== "admin") {

      router.push("/dashboard");

      return;

    }


  }, [
    session,
    status,
    router
  ]);



  if (status === "loading") {

    return (

      <main className="p-10 text-center text-gray-500">

        Checking access...

      </main>

    );

  }



  if (!session) {

    return null;

  }



  if (session.user.role !== "admin") {

    return null;

  }



  return (

    <main className="max-w-6xl mx-auto px-6 py-10">


      <div className="mb-8">


        <h1 className="text-4xl font-bold">

          Admin Review Panel

        </h1>


        <p className="text-gray-500 mt-2">

          Review submitted articles before publishing.

        </p>


      </div>



      <PendingQueue />

      <section className="mt-12">

        <h2 className="text-3xl font-bold mb-6">
          Admin Activity Logs
        </h2>

        <AdminActivityLogs />

      </section>


    </main>

  );

}