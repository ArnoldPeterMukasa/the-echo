"use client";

import Link from "next/link";

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">

        <div className="text-center">

          <h1 className="text-4xl font-black">
            THE ECHO
          </h1>

          <p className="text-gray-500 mt-3">
            Echoing Reality of Thousands...
          </p>

        </div>

        <div className="mt-10 space-y-5">

          <Link
            href="/auth/writer/login"
            className="
              block
              w-full
              text-center
              bg-black
              text-white
              py-4
              rounded-xl
              font-semibold
              hover:bg-gray-800
              transition
            "
          >
            Continue as Writer
          </Link>

          <Link
            href="/auth/admin"
            className="
              block
              w-full
              text-center
              border-2
              border-black
              py-4
              rounded-xl
              font-semibold
              hover:bg-gray-100
              transition
            "
          >
            Continue as Admin
          </Link>

        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Select how you want to access The Echo.
        </p>

      </div>

    </main>
  );
}