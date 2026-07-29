"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function ProfilePage() {


  const { data: session } =
    useSession();



  const [firstName,setFirstName] =
    useState("");

  const [lastName,setLastName] =
    useState("");

  const [bio,setBio] =
    useState("");

  const [image,setImage] =
    useState("");



  const [currentPassword,setCurrentPassword] =
    useState("");

  const [newPassword,setNewPassword] =
    useState("");

  const [confirmPassword,setConfirmPassword] =
    useState("");



  const [saving,setSaving] =
    useState(false);


  const [message,setMessage] =
    useState("");




  useEffect(()=>{


    async function loadProfile(){


      const response =
        await fetch("/api/profile");


      if(response.ok){


        const user =
          await response.json();



        setFirstName(user.firstName || "");

        setLastName(user.lastName || "");

        setBio(user.bio || "");

        setImage(user.image || "");


      }


    }



    if(session){

      loadProfile();

    }


  },[session]);







  function passwordStrength(password:string){


    let score = 0;


    if(password.length >= 8)
      score++;


    if(/[a-z]/.test(password))
      score++;


    if(/[A-Z]/.test(password))
      score++;


    if(/[0-9]/.test(password))
      score++;



    return score;

  }






  const strength =
    passwordStrength(newPassword);



  const strengthText =
    strength === 0
      ? ""
      : strength === 1
      ? "Weak"
      : strength === 2
      ? "Medium"
      : strength === 3
      ? "Strong"
      : "Very Strong";








  async function saveProfile(){


    setSaving(true);

    setMessage("");



    if(newPassword){


      if(newPassword !== confirmPassword){


        setMessage(
          "Passwords do not match"
        );


        setSaving(false);

        return;

      }



      if(strength < 4){


        setMessage(
          "Password must contain 8+ characters, uppercase, lowercase and number"
        );


        setSaving(false);

        return;

      }


    }






    try {


      const response =
        await fetch(
          "/api/profile",
          {

            method:"PUT",

            headers:{
              "Content-Type":
              "application/json",
            },


            body:JSON.stringify({

              firstName,

              lastName,

              bio,

              image,

              currentPassword,

              newPassword,

            }),

          }
        );



      const data =
        await response.json();




      if(response.ok){


        setMessage(
          "Profile updated successfully"
        );


        setCurrentPassword("");

        setNewPassword("");

        setConfirmPassword("");



      }else{


        setMessage(
          data.message ||
          "Update failed"
        );


      }



    }catch(error){


      setMessage(
        "Something went wrong"
      );


    }



    setSaving(false);


  }






  const initials = (

    firstName.charAt(0) +

    lastName.charAt(0)

  ).toUpperCase();







  return (

    <main className="
      max-w-3xl
      mx-auto
      px-6
      py-10
    ">


      <h1 className="
        text-4xl
        font-bold
        mb-10
      ">

        Edit Profile

      </h1>





      <div className="
        bg-white
        border
        rounded-2xl
        p-8
        shadow-sm
      ">





        <div className="
          flex
          flex-col
          items-center
          mb-10
        ">


          <div className="
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
            overflow-hidden
          ">


            {image ? (

              <img

                src={image}

                alt="Profile"

                className="
                w-full
                h-full
                object-cover
                "

              />

            ) : (

              initials || "U"

            )}



          </div>


        </div>








        <div className="
          grid
          md:grid-cols-2
          gap-6
        ">


          <input

            value={firstName}

            onChange={(e)=>
              setFirstName(e.target.value)
            }

            placeholder="First Name"

            className="
            border
            rounded-xl
            p-3
            "

          />



          <input

            value={lastName}

            onChange={(e)=>
              setLastName(e.target.value)
            }

            placeholder="Last Name"

            className="
            border
            rounded-xl
            p-3
            "

          />


        </div>







        <textarea

          value={bio}

          onChange={(e)=>
            setBio(e.target.value)
          }

          placeholder="Bio"

          rows={5}

          className="
          w-full
          border
          rounded-xl
          p-3
          mt-6
          "

        />









        <h2 className="
          text-2xl
          font-bold
          mt-10
          mb-5
        ">

          Change Password

        </h2>





        <div className="space-y-4">


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






          {newPassword && (

            <div>


              <div className="
                flex
                gap-2
                mt-3
              ">


                {[1,2,3,4].map((bar)=>(

                  <div

                    key={bar}

                    className={`
                      h-2
                      flex-1
                      rounded
                      ${
                        strength >= bar
                        ? "bg-black"
                        : "bg-gray-200"
                      }
                    `}

                  />

                ))}


              </div>


              <p className="
                text-sm
                mt-2
              ">

                {strengthText}

              </p>



            </div>

          )}






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

          onClick={saveProfile}

          disabled={saving}

          className="
          mt-8
          bg-black
          text-white
          px-8
          py-3
          rounded-xl
          disabled:opacity-50
          "

        >

          {saving
            ? "Saving..."
            : "Save Changes"
          }

        </button>







        {message && (

          <p className="
            mt-4
            text-sm
            text-gray-600
          ">

            {message}

          </p>

        )}



      </div>


    </main>

  );


}