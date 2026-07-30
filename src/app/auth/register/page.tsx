"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function ReaderSignupPage() {


  const router = useRouter();



  const [form,setForm] = useState({

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
          "/api/auth/signup",
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
        "/login"
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
      bg-gray-50
      flex
      items-center
      justify-center
      px-6
    ">



      <div className="
        bg-white
        shadow-xl
        rounded-2xl
        p-8
        w-full
        max-w-md
      ">




        <h1 className="
          text-3xl
          font-black
          mb-2
        ">

          Create Reader Account

        </h1>





        <p className="
          text-gray-500
          mb-6
        ">

          Join The Echo community.

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

              : field.name==="email"

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
              w-full
              border
              rounded-lg
              p-3
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
            w-full
            bg-black
            text-white
            rounded-lg
            py-3
          "


        >


          {

            loading

            ? "Creating..."

            : "Create Account"

          }



        </button>









        <p className="
          text-center
          text-sm
          mt-6
        ">


          Already have an account?



          <Link

            href="/login"

            className="
              ml-2
              font-semibold
            "

          >

            Login

          </Link>



        </p>





      </div>




    </main>


  );


}