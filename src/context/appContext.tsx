"use client"
import React, { createContext, useEffect, useState } from "react";

export interface WalletTypes{
    publicId: string,
    privateId: string,
    method: string,
    number: number,
}
interface AppContextStateType {
  password: string,
  seedHash: string,
  wallets: WalletTypes[],
  walletIndex: number,
}
const initialState = {
  password: "",
  seedHash: "",
  walletIndex: 0,
  wallets: [],
}

interface AppContextType {
  walletState: AppContextStateType,
  setWalletState?: React.Dispatch<React.SetStateAction<AppContextStateType>>,
  isAuthenticated?: boolean,
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>

}

export const AppContext = createContext<AppContextType >({walletState: initialState});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

const [walletState, setWalletState] = useState<AppContextStateType>(initialState)
const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useEffect(()=>{
const passwordHash =  localStorage.getItem("password")
let wallets = null;
let walletIndex = 0;
if( localStorage.getItem("wallets")){
    wallets = JSON.parse( localStorage.getItem("wallets") as string)
}else{
  localStorage.setItem("wallets", "[]")
}
const seedHash = localStorage.getItem("seedHash")
if(localStorage.getItem("walletIndex")){
   walletIndex = Number( localStorage.getItem("walletIndex"))
}else{
    localStorage.setItem("walletIndex", "0")
}
setWalletState({
    password: passwordHash || "",
    wallets: wallets || [],
    seedHash: seedHash || "",
    walletIndex: walletIndex || 0,
})


    }, [])

  return (
    <AppContext.Provider value={{walletState, setWalletState, isAuthenticated, setIsAuthenticated}}>{children}</AppContext.Provider>
  );
};
