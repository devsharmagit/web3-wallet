"use client";
import React, { useEffect, useState } from 'react';
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
import { Button } from './ui/button';
import { WalletTypes } from '@/context/appContext';
import axios from "axios";
import AirdropAlert from './AirdropAlert';
import { Network } from '@/app/wallets/page';

const AccountInfo = ({activeWallet, network} : {activeWallet: WalletTypes, network: string}) => {

    const [isHidden,setIsHidden] = useState<boolean>(false)
const [balance, setBalance] = useState<number>(0)
const [isAirdropOpen, setIsAirdropOpen] = useState<boolean>(false)

const handleAirdropClick = ()=>{
  setIsAirdropOpen(true)
}
const requestAirdrop =  async(amount : number)=>{
  try {
    const response = await axios.post(`https://solana-devnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`, {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "requestAirdrop",
      "params": [activeWallet.publicId, amount]
      })
      if(response.status === 200){
      alert("airdrop successeded")
      }
    } catch (error) {
      console.log(error)
    }finally{
      setIsAirdropOpen(false)
  }

}


const fetchbalance = async ()=>{
const response = await axios.post(`https://solana-devnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`, {
"jsonrpc": "2.0",
"id": 1,
"method": "getAccountInfo",
"params": [activeWallet.publicId]
})
if(response.status === 200){
setBalance((response.data.result.value.lamports)/1000000000 || 0)
}

}
    useEffect(()=>{
        fetchbalance()
    }, [activeWallet])

  return (
    <div className='col-span-3 flex-grow px-4 py-4'>
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
          Balance : {balance} SOL
        </h1>
        
        </div>
        <div>
        <h1 className='text-lg font-medium'>
          Public Key :
        </h1>
        <div className='p-1  items-center gap-2 flex justify-between'>
        <Input readOnly value={activeWallet.publicId} className='text-xs'/>
    <Clipboard className='cursor-pointer' onClick={()=>navigator.clipboard.writeText(activeWallet.publicId)} />
        </div>
        </div>
      
       <div>
        <h1 className='text-lg font-medium'>
          Private Key :
        </h1>
        <div className='p-1  items-center  flex justify-between'>
          <Input readOnly type={isHidden ? "password" : "text"} value={activeWallet.privateId} className='text-xs' />
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
       <Button disabled={network === Network.mainnet } onClick={handleAirdropClick} variant={"default"} className="w-full bg-red-800 text-white hover:bg-red-700 flex gap-1">
         <ArrowDownToLine className='w-4 h-4'/>
         Request Airdrop
          </Button>
       </div>
      </CardContent>
     
    </Card>
    <AirdropAlert setIsAlertOpen={setIsAirdropOpen} open={isAirdropOpen} onSuccess={requestAirdrop} key={activeWallet.publicId} />
    </div>
  )
}

export default AccountInfo
