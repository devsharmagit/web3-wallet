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
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";

const EnterPassword = () => {
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const hashedPassword = localStorage.getItem("password-hash") 

  const handleClick = async () => {
    if(hashedPassword){
        const hashedPass = await bcrypt.compare(password, hashedPassword);
        if(hashedPass) router.push("/wallets")
        alert("Wrong Password.")
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
            disabled={password.length < 8}
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
