"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";


export default function LoginPage(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");



const login=async()=>{

 await signIn(
  "credentials",
  {
    email,
    password,
    callbackUrl:"/dashboard"
  }
 );

};



return(

<main className="
min-h-screen
flex
items-center
justify-center
">


<div className="
border
rounded-xl
p-10
w-96
">


<h1 className="
text-3xl
font-bold
mb-6
">
Login To The Echo
</h1>



<input

className="
border
p-3
w-full
mb-3
rounded
"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>



<input

type="password"

className="
border
p-3
w-full
mb-4
rounded
"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>



<button

onClick={login}

className="
bg-black
text-white
w-full
py-3
rounded
"

>
Login
</button>



<div className="my-5 text-center text-gray-400">
OR
</div>



<button

onClick={()=>
 signIn(
  "google",
  {
   callbackUrl:"/dashboard"
  }
 )
}

className="
bg-red-600
text-white
w-full
py-3
rounded
"

>
Continue with Google
</button>


</div>


</main>

)

}