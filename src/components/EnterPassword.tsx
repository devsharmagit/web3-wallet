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

const EnterPassword = () => {

  const {setIsAuthenticated} = useContext(AppContext)

  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const hashedPassword = localStorage.getItem("password") 
  console.log(hashedPassword)

  const handleClick = async () => {
    if(hashedPassword){
        const hashedPass = await bcrypt.compare(password, hashedPassword);
        console.log(hashedPass)
        if(hashedPass) {
          if(setIsAuthenticated) {
            setIsAuthenticated(true)}
          router.push("/wallets")
        }
          else{
            alert("wrong password!")
          }
        
    }
  };

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <Card className="w-[600px]  border-2 border-white border-opacity-30">
        <CardHeader className="text-center text-2xl font-semibold">
          <CardTitle className="text-center text-3xl font-semibold">  
           Password
          </CardTitle>
          <CardDescription className="text-center ">
          Enter password to access.
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
            disabled={password.length < 7}
            variant={"default"}
            className="w-full bg-green-800 text-white hover:bg-green-700"
          >
            Enter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EnterPassword;
