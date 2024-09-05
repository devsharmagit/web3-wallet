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
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EnterPassword = () => {

  const { toast} = useToast()

  const {setIsAuthenticated} = useContext(AppContext)

  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const hashedPassword = localStorage.getItem("password") 

  const handleClick = async () => {
    if(hashedPassword){
      setIsLoading(true)
        const hashedPass = await bcrypt.compare(password, hashedPassword);
        if(hashedPass) {
          if(setIsAuthenticated) {
            setIsAuthenticated(true)
            router.push("/wallets")
            toast({
              description: "Successfully Logged In!",
              variant: "success",
            })
          }
        } else{
          toast({
            description: "Wrong Password!",
            variant: "destructive",
          })
          }
        setIsLoading(false)
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
          {isLoading && <Loader className="animate-spin" /> }
            Enter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EnterPassword;
