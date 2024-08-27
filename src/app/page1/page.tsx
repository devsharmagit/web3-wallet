"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateMnemonic } from 'bip39';
import { Checkbox } from "@/components/ui/checkbox"


const mnemonic = generateMnemonic();




const Page = () => {

  const [isChecked, setIsChecked] = useState(false)

  const handleClick = ()=>{
    setIsChecked(!isChecked)
  }

  return (
    <div className="h-[90vh] flex justify-center items-center">
    <Card className="w-[600px]  border-2 border-white border-opacity-30">
      <CardHeader className="text-center text-2xl font-semibold">
        <CardTitle className="text-center text-3xl font-semibold"> Your Seed Phrase. </CardTitle>
        <CardDescription className="text-center ">
          Below is your seed phrase of 12 words.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2">
{

  
  mnemonic.split(" ").map((word)=>{
    return <Input value={word} disabled key={word} className="disabled:opacity-100"/>
  })
  
}


        
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex gap-3 py-3">
      <Checkbox checked={isChecked} onClick={handleClick} id="terms2"  />
      <label
        htmlFor="terms2"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
      I have copied my seed phrase somewhere safe.
      </label>
        </div>

      <Button disabled={!isChecked} variant={"default"} className="w-full bg-green-800 text-white hover:bg-green-700">
          Make a new Wallet.
        </Button>
        
      </CardFooter>
      
    </Card>
  </div>
  );
};

export default Page;
