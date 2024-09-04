"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const GetStarted = () => {

    const router = useRouter()

    const handleMakeWallet = ()=>{
router.push("/make-wallet")
    }
    const handleImportWallet = ()=>{

    }

  return (
    <Card className="w-[350px]  border-2 border-white border-opacity-30">
    <CardHeader className="text-center text-2xl font-semibold">
      <CardTitle className="text-center text-3xl font-semibold"> Get Started. </CardTitle>
      <CardDescription className="text-center ">
        Choose the below option which suits you best.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-3 items-center justify-center">

      <Button onClick={handleMakeWallet} variant={"default"} className="w-full bg-green-800 text-white hover:bg-green-700">
        Make a new Wallet.
      </Button>
      <Button onClick={handleImportWallet} variant={"outline"} className="w-full">
      Import a Wallet.
      </Button>
      </div>
    </CardContent>
    
  </Card>
  )
}

export default GetStarted
