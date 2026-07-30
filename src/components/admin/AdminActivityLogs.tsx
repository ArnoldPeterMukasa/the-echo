"use client";


import { useEffect,useState } from "react";


type Log = {

  _id:string;

  action:string;

  details:string;

  createdAt:string;


  admin:{
    firstName:string;
    lastName:string;
  };


  article?:{
    title:string;
  };

};




export default function AdminActivityLogs(){


  const [logs,setLogs] =
    useState<Log[]>([]);



  const [loading,setLoading] =
    useState(true);




  async function loadLogs(){


    try{


      const response =
        await fetch(
          "/api/admin/activity"
        );


      const data =
        await response.json();



      setLogs(data);



    }catch(error){


      console.error(error);


    }finally{


      setLoading(false);


    }


  }






  useEffect(()=>{


    loadLogs();


  },[]);






  if(loading){


    return (

      <p className="text-gray-500">
        Loading activity logs...
      </p>

    );


  }







  if(logs.length===0){


    return (

      <p className="text-gray-500">
        No admin activity yet.
      </p>

    );


  }








  return (

    <div className="space-y-4">


      {logs.map((log)=>(


        <div

          key={log._id}

          className="
          border
          rounded-xl
          p-4
          bg-white
          "

        >



          <div className="flex justify-between">


            <p className="font-semibold">

              {log.admin?.firstName}{" "}
              {log.admin?.lastName}

            </p>



            <span className="text-xs text-gray-400">

              {new Date(
                log.createdAt
              ).toLocaleString()}

            </span>


          </div>





          <p className="
          text-sm
          text-gray-600
          mt-2
          ">

            {log.action}

          </p>





          <p className="mt-2">

            {log.details}

          </p>




        </div>


      ))}



    </div>

  );


}