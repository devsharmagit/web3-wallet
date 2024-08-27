import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="h-[90vh] flex justify-center items-center">
      <Card className="w-[350px]  border-2 border-white border-opacity-30">
        <CardHeader className="text-center text-2xl font-semibold">
          <CardTitle className="text-center text-3xl font-semibold"> Get Started. </CardTitle>
          <CardDescription className="text-center ">
            Choose the below option which suits you best.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 items-center justify-center">

          <Button variant={"default"} className="w-full bg-green-800 text-white hover:bg-green-700">
            Make a new Wallet.
          </Button>
          <Button variant={"outline"} className="w-full">
          Import a Wallet.
          </Button>
          </div>
        </CardContent>
        
      </Card>
    </div>
  );
};

export default Page;