"use client";
import React, { useContext, useState } from 'react'
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button'
import { AppContext, WalletTypes } from '@/context/appContext'
import { makeWallet } from '@/lib/wallet';
import Alert from '@/components/Alert';
import AccountInfo from '@/components/AccountInfo';



const Page = () => {

    const {walletState, setWalletState} = useContext(AppContext)

    const [activeWallet, setActiveWallet] = useState<WalletTypes>(walletState.wallets[0])
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const [apinetwork ,setNetwork] = useState<"mainnet" | "devnet">("mainnet")

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
setIsAlertOpen(false)
    }
  return (
    <>
  <div className="w-full py-4 gap-4 flex justify-center">
  <div onClick={()=>setNetwork('mainnet')}
    className={`w-[100px] text-center bg-transparent cursor-pointer border-white border-opacity-50 text-white border rounded-lg px-2 py-1 ${
      apinetwork === "mainnet" ? "!bg-blue-500 border-blue-500 border-opacity-100" : ""
    }`}
  >
    <p>Mainnet</p>
  </div>
  <div onClick={()=>setNetwork("devnet")}
    className={`w-[100px] text-center cursor-pointer bg-transparent border-white border-opacity-50 border rounded-lg px-2 py-1 ${
      apinetwork === "devnet" ? "!bg-blue-500 border-blue-500 border-opacity-100" : ""
    }`}
  >
    <p>Devnet</p>
  </div>
</div>

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
<Button onClick={()=>setIsAlertOpen(true)} variant={"default"} className="w-full !py-0 bg-green-800 text-white hover:bg-green-700">
       add Wallet
</Button>
</div>

</div>
{
  activeWallet ? <AccountInfo activeWallet={activeWallet}network={apinetwork} /> : <p className='text-center w-full py-4'>Choose an account!</p>
  
}

      </div>
   
    <Alert open={isAlertOpen} setIsAlertOpen={setIsAlertOpen} onSuccess={handleAddWalletclick} />
    </div>
    </>
  )
}

export default Page
