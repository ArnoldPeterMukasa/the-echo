"use client";

import {signIn} from "next-auth/react";
import {useState} from "react";

export default function AdminLoginPage(){
    const [email, setEmai]=useState("");
    const [password, setPassword]=useState("");

    const login = async ()=>{
        await signIn("credentials", {
            email,
            password,
            callbackUrl: "/dashboard/admin",
        });
    };
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                
                <h1 className="text-3xl font-bold text-center">
                    Admin Login
                </h1>
                <p className="text-center text-gray-500 mt-2 mb-8">
                    Authorized personnel only!
                </p>
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e)=>setEmai(e.target.value)}
                            placeholder="youremail@gmail.com"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>

                        <input
                              type="password"
                              value={password}
                              onChange={(e)=>setPassword(e.target.value)}
                              placeholder="********"
                              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />

                    </div>
                    <button
                        onClick={login}
                        className="z-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
                    >
                        Login
                    </button>
                </div>

            </div>
        </main>
    )
}