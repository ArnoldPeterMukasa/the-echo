"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";


export default function Header() {

  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);



  const name =
    session?.user?.name || "";


  const parts =
    name.split(" ");


  const initials =
    (
      (parts[0]?.[0] || "") +
      (parts[1]?.[0] || "")
    ).toUpperCase();



  function closeMenus(){
    setMobile(false);
    setOpen(false);
  }



  return (

<header className="
sticky
top-0
bg-white
border-b
z-50
">


<div className="
max-w-7xl
mx-auto
px-6
h-16
flex
items-center
justify-between
">


<Link href="/home" onClick={closeMenus}>

<div>

<h1 className="
text-2xl
font-bold
">
The Echo
</h1>


<p className="
text-xs
text-gray-500
">
Echoing Reality of Thousands...
</p>


</div>

</Link>





<button

className="
md:hidden
text-2xl
"

aria-label="Toggle menu"

onClick={()=> {
  setMobile(!mobile);
  setOpen(false);
}}

>

{mobile ? "✕" : "☰"}

</button>






<nav

className={`

${mobile ? "flex" : "hidden"}

md:flex

absolute

md:static

top-16

left-0

right-0

bg-white

md:bg-transparent

border-b

md:border-none

flex-col

md:flex-row

items-center

gap-6

p-6

md:p-0

text-sm

font-medium

`}

>



<Link href="/home" onClick={closeMenus}>
Home
</Link>



<Link href="/articles" onClick={closeMenus}>
Articles
</Link>




{session && (

<Link href="/dashboard" onClick={closeMenus}>
Dashboard
</Link>

)}





<Link href="/about" onClick={closeMenus}>
About
</Link>




<Link href="/contact" onClick={closeMenus}>
Contact
</Link>








{!session ? (

<div className="
flex
gap-3
items-center
">


<Link

href="/auth"

onClick={closeMenus}

className="
px-4
py-2
rounded-lg
bg-black
text-white
"

>

Login

</Link>




<Link

href="/auth/register"

onClick={closeMenus}

className="
px-4
py-2
rounded-lg
border
"

>

Sign Up

</Link>


</div>



) : (



<div className="relative">


<button

onClick={()=>setOpen(!open)}

className="
flex
items-center
gap-3
"

>


<div className="
w-10
h-10
rounded-full
bg-black
text-white
flex
items-center
justify-center
font-bold
overflow-hidden
">


{session.user.image ? (

<img

src={session.user.image}

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



<span className="font-semibold">

{parts[0]}

</span>



<span>
▼
</span>



</button>








{open && (

<div className="

absolute

right-0

mt-3

w-60

bg-white

border

rounded-xl

shadow-lg

overflow-hidden

">


<div className="
p-4
border-b
">


<p className="font-semibold">

{session.user.name}

</p>


<p className="
text-xs
text-gray-500
">

{session.user.email}

</p>


<p className="
text-xs
text-gray-400
capitalize
">

{session.user.role}

</p>


</div>





<Link

href="/profile"

onClick={closeMenus}

className="
block
px-4
py-3
hover:bg-gray-100
"

>

Edit Profile

</Link>





<button

onClick={()=>signOut({
callbackUrl:"/home"
})}

className="
w-full
text-left
px-4
py-3
text-red-600
hover:bg-red-50
"

>

Logout

</button>


</div>

)}



</div>


)}




</nav>


</div>


</header>

  );

}