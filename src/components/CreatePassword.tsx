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
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/appContext";

const CreatePassword = () => {
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const {setWalletState, walletState} = useContext(AppContext)

  const handleClick = async () => {
    if (password.length < 8) {
      alert("password should be 8 characters long!");
      return;
    }
    const hashedPass = await bcrypt.hash(password, 10);
    localStorage.setItem("password", hashedPass);
    if (localStorage.getItem("password")) {
      if(setWalletState)  setWalletState({...walletState, password})
      router.push("/wallets");
    }
  };

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <Card className="w-[600px]  border-2 border-white border-opacity-30">
        <CardHeader className="text-center text-2xl font-semibold">
          <CardTitle className="text-center text-3xl font-semibold">  
            Create Password
          </CardTitle>
          <CardDescription className="text-center ">
            This password will be stored locally.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            onClick={handleClick}
            disabled={password.length < 8}
            variant={"default"}
            className="w-full bg-green-800 text-white hover:bg-green-700"
          >
            Confirm
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreatePassword;
