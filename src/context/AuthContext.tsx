"use client";

import {
  createContext,
  useContext,
} from "react";

import {
  useSession,
  signOut,
} from "next-auth/react";

import {
  users,
  User,
} from "@/src/data/users";


type AuthContextType = {

  user: User | null;

  logout: () => void;

};



const AuthContext =
createContext<AuthContextType | undefined>(
  undefined
);



export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {


  const {
    data: session
  } = useSession();



  let user: User | null = null;



  if(session?.user?.email){


    const foundUser =
      users.find(
        (u)=>
          u.email === session.user?.email
      );


    if(foundUser){
      user = foundUser;
    }

  }



  const logout = () => {

    signOut();

  };



  return (

    <AuthContext.Provider
      value={{
        user,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}



export function useAuth(){

 const context =
 useContext(AuthContext);


 if(!context){

  throw new Error(
    "useAuth must be used inside AuthProvider"
  );

 }


 return context;

}