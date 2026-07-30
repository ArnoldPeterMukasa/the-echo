"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function WriterSignupPage() {


  const router = useRouter();


  const [form, setForm] = useState({

    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",

  });



  const [error,setError] =
    useState("");



  const [loading,setLoading] =
    useState(false);





  const handleChange = (
    e:React.ChangeEvent<HTMLInputElement>
  )=>{


    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });


  };








  const signup = async()=>{


    setError("");




    if(
      form.password !==
      form.confirmPassword
    ){

      setError(
        "Passwords do not match"
      );

      return;

    }






    const validPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;



    if(!validPassword.test(form.password)){


      setError(
        "Password must contain uppercase, lowercase and number"
      );


      return;


    }







    try{


      setLoading(true);




      const res =
        await fetch(
          "/api/auth/writer/signup",
          {

            method:"POST",

            headers:{

              "Content-Type":
                "application/json",

            },


            body:JSON.stringify({

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






      if(!res.ok){


        setError(
          data.message
        );


        return;


      }






      router.push(
        "/auth/writer/login"
      );




    }catch{


      setError(
        "Something went wrong"
      );



    }finally{


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
      bg-gray-50
    ">



      <div className="
        w-full
        max-w-md
        bg-white
        border
        rounded-2xl
        p-8
        shadow
      ">



        <h1 className="
          text-3xl
          font-bold
          mb-2
        ">

          Writer Sign Up

        </h1>



        <p className="
          text-gray-500
          mb-6
        ">

          Join The Echo as a contributor.

        </p>






        {[
          {
            name:"firstName",
            placeholder:"First Name"
          },
          {
            name:"lastName",
            placeholder:"Last Name"
          },
          {
            name:"email",
            placeholder:"Email"
          },
          {
            name:"password",
            placeholder:"Password"
          },
          {
            name:"confirmPassword",
            placeholder:"Confirm Password"
          },

        ].map((field)=>(


          <input

            key={field.name}

            name={field.name}

            type={
              field.name.includes("password")
              ? "password"
              : field.name === "email"
              ? "email"
              : "text"
            }

            placeholder={field.placeholder}

            value={
              form[
                field.name as keyof typeof form
              ]
            }

            onChange={handleChange}

            className="
              border
              rounded-lg
              p-3
              w-full
              mb-3
            "

          />


        ))}







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
            rounded-lg
            py-3
            w-full
          "

        >

          {
            loading
            ? "Creating account..."
            : "Create Writer Account"
          }


        </button>







        <p className="
          text-center
          text-sm
          mt-6
          text-gray-500
        ">

          Already a writer?{" "}


          <Link
            href="/auth/writer/login"
            className="text-black font-semibold"
          >

            Login

          </Link>


        </p>




      </div>


    </main>


  );

}