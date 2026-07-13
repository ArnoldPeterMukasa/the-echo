"use client";


import { signIn } from "next-auth/react";


export default function LoginPage(){

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
text-center
">


<h1 className="text-3xl font-bold">
Login to The Echo
</h1>


<p className="text-gray-500 mt-3">
Writers and editors only
</p>



<button

onClick={()=>signIn("google")}

className="
mt-6
bg-black
text-white
px-6
py-3
rounded-lg
"

>

Continue with Google

</button>


</div>


</main>

);

}