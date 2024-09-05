"use client"
import SeedPhrase from '@/components/SeedPhrase'
import { AppContext } from '@/context/appContext'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const Page = () => {

  const {isAuthenticated, walletState} = useContext(AppContext)

  const router = useRouter()
  

  if(walletState.seedHash && isAuthenticated){
    return router.push("/wallets")
  }

  console.log(walletState)
  console.log(isAuthenticated)

  return (
    <div className="h-[90vh] flex justify-center items-center">
    <SeedPhrase />
     </div>
  )
}

export default Page
