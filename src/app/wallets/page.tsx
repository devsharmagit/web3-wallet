"use client";
import React, { useContext, useState } from 'react'
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { AppContext, WalletTypes } from '@/context/appContext'
import { makeWallet } from '@/lib/wallet';
import { availableMemory } from 'process';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Clipboard, Eye, EyeOff,Send, ArrowDownToLine } from 'lucide-react';
import { Input } from "@/components/ui/input"
import Image from 'next/image';






const Page = () => {

    const {walletState, setWalletState} = useContext(AppContext)

    const [activeWallet, setActiveWallet] = useState<WalletTypes>(walletState.wallets[0])
    const [isHidden, setIsHidden] = useState<boolean>(true)

    const handleAddWalletclick = ()=>{
const {publickKey, privateKey, path} = makeWallet(walletState.seedHash, walletState.walletIndex)
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
}
if(setWalletState){
  setWalletState(newWalletState)
  localStorage.setItem("wallets", JSON.stringify(newWallets) )
  localStorage.setItem("walletIndex", Number( walletState?.walletIndex + 1).toString())
} 
    }
  return (
    <div className="h-[88vh] flex justify-center items-center py-4">
      <div className='max-w-7xl w-[100vw] px-4  flex  h-full border-2 rounded-2xl border-white border-opacity-30 overflow-hidden'>
<div className='w-[250px] py-4 px-2'> 
    <h1 className='text-xl font-bold'> Wallets </h1>
<Separator  className='my-2'/>

<div className='flex flex-col gap-2'>
    {walletState?.wallets?.map((wallet, index)=>{
      return <div onClick={()=>setActiveWallet(wallet)}  key={wallet?.publicId} className={`px-2 py-1 cursor-pointer border rounded-md text-sm border-white border-opacity-50 text-white ${wallet?.publicId === activeWallet?.publicId && "bg-white !text-black"}`}>
Account {index + 1}
      </div>
    })}
<Button onClick={handleAddWalletclick} variant={"default"} className="w-full !py-0 bg-green-800 text-white hover:bg-green-700">
       add Wallet
</Button>
</div>

</div>
{
  activeWallet && <div className='col-span-3 flex-grow px-4 py-4'>
  <div className='mb-4'>
  
    <h1 className='text-2xl font-bold'> Account {activeWallet.number + 1}</h1>
  </div>
  <Card>
    
    <CardHeader>
    <Image alt='solana' src={"/solana.svg"} width={100} height={100}  className=' object-contain h-[50px] w-[50px]' />
      <CardDescription>
        Your Accont Information
      </CardDescription>
    </CardHeader>
    <CardContent className='flex flex-col gap-3'>
      <div>
      <h1 className='text-lg font-medium'>
        Public Key :
      </h1>
      <div className='p-1  items-center gap-2 flex justify-between'>
      <Input  value={activeWallet.publicId} className='text-xs'/>
  <Clipboard className='cursor-pointer' onClick={()=>navigator.clipboard.writeText(activeWallet.publicId)} />
      </div>
      </div>
     <div>
      <h1 className='text-lg font-medium'>
        Private Key :
      </h1>
      <div className='p-1  items-center  flex justify-between'>
        <Input type={isHidden ? "password" : "text"} value={activeWallet.privateId} className='text-xs' />
        <div className='flex items-center px-2 gap-1'>
          {
            isHidden ? 
  <Eye className='cursor-pointer' onClick={()=>setIsHidden(false)} />
    :
    <EyeOff className='cursor-pointer' onClick={()=>setIsHidden(true)} />
          }
  <Clipboard className='cursor-pointer' onClick={()=>navigator.clipboard.writeText(activeWallet.privateId)} />
        </div>
      </div>
     </div>
     <div className='w-fit flex gap-2'>
     <Button variant={"default"} className="w-full bg-green-800 text-white hover:bg-green-700 flex gap-1">
       <Send className='w-4 h-4'/>
       Send
        </Button>
     <Button variant={"default"} className="w-full bg-red-800 text-white hover:bg-red-700 flex gap-1">
       <ArrowDownToLine className='w-4 h-4'/>
       Request Airdrop
        </Button>
     </div>
    </CardContent>
   
  </Card>
  </div>
}

      </div>
    </div>
  )
}

export default Page
