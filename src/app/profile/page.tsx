"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";


export default function ProfilePage() {

  const { data: session } = useSession();


  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [bio, setBio] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");


  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");



  useEffect(()=>{


    async function loadProfile(){

      const res = await fetch("/api/profile");

      if(res.ok){

        const user = await res.json();


        setFirstName(
          user.firstName || ""
        );


        setLastName(
          user.lastName || ""
        );


        setBio(
          user.bio || ""
        );

      }

    }


    if(session){

      loadProfile();

    }


  },[session]);





  async function saveProfile(){


    setSaving(true);

    setMessage("");



    try {


      const response = await fetch(

        "/api/profile",

        {

          method:"PUT",

          headers:{

            "Content-Type":"application/json",

          },


          body:JSON.stringify({

            firstName,

            lastName,

            bio,

          }),

        }

      );



      if(response.ok){


        setMessage(
          "Profile updated successfully"
        );


      }else{


        setMessage(
          "Update failed"
        );


      }



    }catch{


      setMessage(
        "Something went wrong"
      );


    }



    setSaving(false);


  }





  return (

    <main className="max-w-3xl mx-auto px-6 py-10">


      <h1 className="text-4xl font-bold mb-10">

        Edit Profile

      </h1>




      <div className="bg-white border rounded-2xl p-8 shadow-sm">



        <div className="flex flex-col items-center mb-10">


          <div
            className="
            w-28
            h-28
            rounded-full
            bg-black
            text-white
            flex
            items-center
            justify-center
            text-4xl
            font-bold
            "
          >

            {firstName
              ? firstName.charAt(0).toUpperCase()
              : "U"
            }

          </div>



          <button

            className="
            mt-4
            border
            rounded-lg
            px-4
            py-2
            "

          >

            Change Photo

          </button>


        </div>





        <div className="grid md:grid-cols-2 gap-6">


          <div>

            <label className="block mb-2 font-medium">

              First Name

            </label>


            <input

              value={firstName}

              onChange={(e)=>
                setFirstName(e.target.value)
              }

              className="
              w-full
              border
              rounded-xl
              p-3
              "

            />

          </div>





          <div>


            <label className="block mb-2 font-medium">

              Last Name

            </label>



            <input

              value={lastName}

              onChange={(e)=>
                setLastName(e.target.value)
              }


              className="
              w-full
              border
              rounded-xl
              p-3
              "

            />


          </div>


        </div>






        <div className="mt-6">


          <label className="block mb-2 font-medium">

            Bio

          </label>



          <textarea

            rows={5}

            value={bio}

            onChange={(e)=>
              setBio(e.target.value)
            }


            className="
            w-full
            border
            rounded-xl
            p-3
            "

          />


        </div>






        <h2 className="text-2xl font-bold mt-10 mb-6">

          Change Password

        </h2>





        <div className="space-y-5">


          <input

            type="password"

            placeholder="Current Password"

            value={currentPassword}

            onChange={(e)=>
              setCurrentPassword(e.target.value)
            }


            className="
            w-full
            border
            rounded-xl
            p-3
            "

          />




          <input

            type="password"

            placeholder="New Password"

            value={newPassword}

            onChange={(e)=>
              setNewPassword(e.target.value)
            }


            className="
            w-full
            border
            rounded-xl
            p-3
            "

          />




          <input

            type="password"

            placeholder="Confirm New Password"

            value={confirmPassword}

            onChange={(e)=>
              setConfirmPassword(e.target.value)
            }


            className="
            w-full
            border
            rounded-xl
            p-3
            "

          />



        </div>






        <button


          disabled={saving}


          onClick={saveProfile}



          className="
          mt-10
          bg-black
          text-white
          px-8
          py-3
          rounded-xl
          font-semibold
          disabled:opacity-50
          "

        >


          {saving
            ? "Saving..."
            : "Save Changes"
          }


        </button>




        {message && (

          <p className="mt-4 text-sm text-gray-600">

            {message}

          </p>

        )}




      </div>


    </main>

  );

}