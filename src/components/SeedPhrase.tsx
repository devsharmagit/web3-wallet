"use client";
import React, { useContext, useState } from "react";
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
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter,  } from "next/navigation";
import { AppContext } from "@/context/appContext";
import { makeWallet } from "@/lib/wallet";
import { useToast } from "@/hooks/use-toast";



const mnemonic = generateMnemonic();



const SeedPhrase = () => {
const router = useRouter()

const {toast} = useToast()

  const [isChecked, setIsChecked] = useState(false)
  const {walletState, setWalletState} = useContext(AppContext)


  const handleClick = ()=>{
    setIsChecked(!isChecked)
  }

  const handleWalletClick = async ()=>{
    try {
        const seedPhrase =  (await mnemonicToSeed(mnemonic)).toString("hex");
        localStorage.setItem("seedHash", seedPhrase)
        const {privateKey, publickKey, path} = makeWallet(seedPhrase, walletState?.walletIndex)
        const newWallets = [...walletState.wallets, {
          privateId : privateKey,
          publicId: publickKey,
          method: path,
          number: walletState.walletIndex
        }]
        const newWalletState = {
        ...walletState,
          walletIndex: walletState?.walletIndex + 1,
          wallets: newWallets,
          seedHash: seedPhrase,
        }
        if(setWalletState){
          setWalletState(newWalletState)
          localStorage.setItem("wallets", JSON.stringify(newWallets) )
          localStorage.setItem("walletIndex", Number( walletState?.walletIndex + 1).toString())
        } 
        toast({
          description: "successfully made seed phrase",
          variant: "success"
        })
          router.push("/create-password")

    } catch (error) {
      toast({
        description: "something went wrong",
        variant: "destructive"
      })
    }
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

      <Button onClick={handleWalletClick} disabled={!isChecked} variant={"default"} className="w-full bg-green-800 text-white hover:bg-green-700">
          Make a new Wallet.
        </Button>
        
      </CardFooter>
      
    </Card>
  </div>
  );
};

export default SeedPhrase;
