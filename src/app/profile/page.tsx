"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function ProfilePage() {

  const { data: session } = useSession();


  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [bio,setBio] = useState("");
  const [image,setImage] = useState("");

  const [currentPassword,setCurrentPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const [saving,setSaving] = useState(false);
  const [message,setMessage] = useState("");



  useEffect(()=>{

    async function loadProfile(){

      const res = await fetch("/api/profile");

      if(res.ok){

        const user = await res.json();

        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
        setBio(user.bio || "");
        setImage(user.image || "");

      }

    }


    if(session)
      loadProfile();


  },[session]);




  const passwordRules = {

    length:newPassword.length >= 8,

    lowercase:/[a-z]/.test(newPassword),

    uppercase:/[A-Z]/.test(newPassword),

    number:/[0-9]/.test(newPassword),

  };



  const strength =
    Object.values(passwordRules)
    .filter(Boolean)
    .length;



  const strengthLabel =
    strength <= 1
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

        setMessage("Passwords do not match");
        setSaving(false);
        return;

      }



      if(strength < 4){

        setMessage(
          "Password must include uppercase, lowercase, number and 8+ characters"
        );

        setSaving(false);
        return;

      }


    }





    const res = await fetch("/api/profile",{

      method:"PUT",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        firstName,
        lastName,
        bio,
        image,
        currentPassword,
        newPassword

      })

    });



    const data = await res.json();



    if(res.ok){

      setMessage("Profile updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    }else{

      setMessage(
        data.message || "Update failed"
      );

    }


    setSaving(false);


  }




  const initials =
    (
      firstName[0] || ""
    )
    +
    (
      lastName[0] || ""
    )
    .toUpperCase();





return (

<main className="max-w-3xl mx-auto px-6 py-12">


<h1 className="text-4xl font-bold mb-8">
Profile Settings
</h1>



<div className="bg-white border rounded-2xl shadow-sm p-8">


<div className="flex justify-center mb-8">


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


{
image ?

<img
src={image}
className="w-full h-full object-cover"
/>

:

initials || "U"

}



</div>


</div>





<div className="grid md:grid-cols-2 gap-5">


<input
value={firstName}
onChange={e=>setFirstName(e.target.value)}
placeholder="First Name"
className="border rounded-xl p-3"
/>


<input
value={lastName}
onChange={e=>setLastName(e.target.value)}
placeholder="Last Name"
className="border rounded-xl p-3"
/>


</div>




<textarea

value={bio}

onChange={e=>setBio(e.target.value)}

placeholder="Bio"

className="
w-full
border
rounded-xl
p-3
mt-5
"

rows={5}

/>






<h2 className="text-2xl font-bold mt-10 mb-5">
Change Password
</h2>



<input

type="password"

value={currentPassword}

onChange={e=>setCurrentPassword(e.target.value)}

placeholder="Current password"

className="
w-full
border
rounded-xl
p-3
mb-4
"

/>





<input

type="password"

value={newPassword}

onChange={e=>setNewPassword(e.target.value)}

placeholder="New password"

className="
w-full
border
rounded-xl
p-3
"

/>





{
newPassword &&

<div className="mt-4">


<div className="flex gap-2">


{
[1,2,3,4].map(i=>(

<div

key={i}

className={`
h-2
flex-1
rounded

${
strength >= i
?
"bg-black"
:
"bg-gray-200"
}

`}

/>

))

}


</div>


<p className="text-sm mt-2 font-medium">

{strengthLabel}

</p>


<div className="text-xs text-gray-500 mt-3 space-y-1">

<p className={passwordRules.length?"text-black":""}>
✓ 8 characters
</p>

<p className={passwordRules.uppercase?"text-black":""}>
✓ Uppercase letter
</p>

<p className={passwordRules.lowercase?"text-black":""}>
✓ Lowercase letter
</p>

<p className={passwordRules.number?"text-black":""}>
✓ Number
</p>


</div>


</div>

}






<input

type="password"

value={confirmPassword}

onChange={e=>setConfirmPassword(e.target.value)}

placeholder="Confirm password"

className="
w-full
border
rounded-xl
p-3
mt-5
"

/>







<button

disabled={saving}

onClick={saveProfile}

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

{
saving
?
"Saving..."
:
"Save Changes"
}

</button>



{
message &&

<p className="mt-4 text-sm text-gray-600">

{message}

</p>

}



</div>


</main>

);


}