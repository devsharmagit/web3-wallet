"use client";
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from './ui/input';

const AirdropAlert = ({open, onSuccess, setIsAlertOpen}:{open: boolean, onSuccess: (amount: number)=>void, setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  
  const [amount, setAmount] = useState<number>(0)

  const handleClick = async ()=>{
    if(amount){
        await onSuccess(amount)
    }
  }

    return (
    <AlertDialog open={open} >
    <AlertDialogTrigger asChild>
      {/* <Button variant="outline">Show Dialog</Button> */}
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Request Airdrop ?</AlertDialogTitle>
        <AlertDialogDescription>
 Enter the amount of lamports you want to request to be in your wallet.
 <br />
 <br />
 <Input type='number' value={amount} onChange={(e)=>setAmount(Number(e.target.value))} />
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={()=>setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default AirdropAlert