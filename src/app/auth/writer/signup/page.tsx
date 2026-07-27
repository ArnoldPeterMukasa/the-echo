"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function WriterSignupPage() {


  const router = useRouter();


  const [form, setForm] = useState({

    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",

  });


  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };



  const signup = async () => {


    setError("");



    if (
      form.password !==
      form.confirmPassword
    ) {

      setError(
        "Passwords do not match"
      );

      return;

    }



    try {

      setLoading(true);



      const res =
        await fetch(
          "/api/auth/writer/signup",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              firstName:
                form.firstName,

              lastName:
                form.lastName,

              email:
                form.email,

              password:
                form.password,

            }),

          }
        );



      const data =
        await res.json();



      if (!res.ok) {

        setError(
          data.message
        );

        return;

      }



      router.push(
        "/auth/writer/login"
      );


    } catch {

      setError(
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }


  };



  return (

    <main className="
      min-h-screen
      flex
      items-center
      justify-center
      px-6
    ">


      <div className="
        w-full
        max-w-md
        border
        rounded-xl
        p-8
      ">


        <h1 className="
          text-3xl
          font-bold
          mb-6
        ">

          Writer Sign Up

        </h1>



        <input

          name="firstName"

          placeholder="First Name"

          value={form.firstName}

          onChange={handleChange}

          className="
            border
            rounded
            p-3
            w-full
            mb-3
          "

        />



        <input

          name="lastName"

          placeholder="Last Name"

          value={form.lastName}

          onChange={handleChange}

          className="
            border
            rounded
            p-3
            w-full
            mb-3
          "

        />



        <input

          name="email"

          type="email"

          placeholder="Email"

          value={form.email}

          onChange={handleChange}

          className="
            border
            rounded
            p-3
            w-full
            mb-3
          "

        />



        <input

          name="password"

          type="password"

          placeholder="Password"

          value={form.password}

          onChange={handleChange}

          className="
            border
            rounded
            p-3
            w-full
            mb-3
          "

        />



        <input

          name="confirmPassword"

          type="password"

          placeholder="Confirm Password"

          value={form.confirmPassword}

          onChange={handleChange}

          className="
            border
            rounded
            p-3
            w-full
            mb-4
          "

        />



        {error && (

          <p className="
            text-red-600
            text-sm
            mb-4
          ">

            {error}

          </p>

        )}



        <button

          onClick={signup}

          disabled={loading}

          className="
            bg-black
            text-white
            rounded
            py-3
            w-full
          "

        >

          {loading
            ? "Creating account..."
            : "Sign Up"
          }


        </button>



      </div>


    </main>

  );

}