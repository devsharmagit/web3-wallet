"use client"

import EnterPassword from "@/components/EnterPassword";
import GetStarted from "@/components/GetStarted";
import { AppContext } from "@/context/appContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";


const Page = () => {

const router = useRouter()

  const {setWalletState, walletState, isAuthenticated} = useContext(AppContext)

  if(isAuthenticated){
    return router.push("/wallets")
  }

  if(walletState.password){
    return <EnterPassword />
  }



  return (
    <div className="h-[90vh] flex justify-center items-center">
   <GetStarted />
    </div>
  );
};

export default Page;