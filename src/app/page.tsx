"use client"

import GetStarted from "@/components/GetStarted";
import { AppContext } from "@/context/appContext";
import React, { useContext } from "react";


const Page = () => {

  const {password, seedHash, wallets} = useContext(AppContext)

  console.log({password, seedHash, wallets})


  return (
    <div className="h-[90vh] flex justify-center items-center">
   <GetStarted />
    </div>
  );
};

export default Page;