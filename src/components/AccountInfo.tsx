"use client";
import React, { useCallback, useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
  } from "@/components/ui/card"
  import { Clipboard, Eye, EyeOff,Send, ArrowDownToLine, RefreshCw } from 'lucide-react';
  import { Input } from "@/components/ui/input"
  import Image from 'next/image';
import { Button } from './ui/button';
import { WalletTypes } from '@/context/appContext';
import axios from "axios";
import AirdropAlert from './AirdropAlert';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from "@/components/ui/skeleton"


const AccountInfo = ({activeWallet, network} : {activeWallet: WalletTypes, network: string}) => {

    const [isHidden,setIsHidden] = useState<boolean>(true)
const [balance, setBalance] = useState<number>(0)
const [isAirdropOpen, setIsAirdropOpen] = useState<boolean>(false)

const [isLoading, setIsLoading] = useState<boolean>(false)

const {toast} = useToast()

const handleAirdropClick = ()=>{
  setIsAirdropOpen(true)
}
const requestAirdrop =  async(amount : number)=>{
  try {
    const response = await axios.post(`https://solana-${network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`, {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "requestAirdrop",
      "params": [activeWallet.publicId, amount]
      })
      if(response.status === 200){
      toast({
        description: "successfully added airdrop",
        variant: "success",
      })
      }
    } catch (error) {
      toast({
        description: "something went wrong",
        variant: "destructive",
      })
    }finally{
      setIsAirdropOpen(false)
  }

}

const fetchbalance = useCallback( async()=>{
  try {
    setIsLoading(true)
    const response = await axios.post(`https://solana-${network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`, {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getAccountInfo",
    "params": [activeWallet.publicId]
    })
    if(response.status === 200){
      if(response?.data?.result?.value?.lamports) {
        setBalance((response.data.result.value.lamports)/1000000000 || 0)
      }else{
        console.log("value is changing")
        setBalance(0)
      }
    }
    
  } catch (error) {
    console.log(error)
    toast({
      description: "something went wrong",
      variant: "destructive",
    })
  }finally{
setIsLoading(false)
  }
}, [activeWallet.publicId, toast, network])


    useEffect(()=>{
        fetchbalance()
    }, [activeWallet, network, fetchbalance])

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
      <div className='flex gap-3 items-center'>
        {isLoading ? <Skeleton className='w-32 h-5 ' />  : 
        <>
        <h1 className='text-lg font-medium '>
          Balance : {balance} SOL
        </h1>
        <Button onClick={fetchbalance} className='p-0  h-6 px-2 rounded-sm tracking-tighter' > <RefreshCw className='w-4 h-4' /> </Button>
        </>
        }
        
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
       <Button disabled={network === "mainnet" } onClick={handleAirdropClick} variant={"default"} className="w-full bg-red-800 text-white hover:bg-red-700 flex gap-1">
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
