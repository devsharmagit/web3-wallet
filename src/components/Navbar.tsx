import React from "react";
import { ThemeToggler } from "@/components/ThemeToggler";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { GithubIcon, TwitterIcon } from "./icons";

const Navbar = () => {
  return (
    <>
      <div className="py-3 px-4 max-w-7xl m-auto flex justify-between items-center">
        <h1 className="dark:text-white font-semibold text-2xl ">
          Web3 wallet
        </h1>
        <div className="flex gap-3 items-center">
          <ThemeToggler />
          <Link href={"https://x.com/CodeDevsharma"} target="_blank">
            <TwitterIcon />
          </Link>
          <Link href={"https://github.com/devsharmagit"} target="_blank">
            <GithubIcon />
          </Link>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Navbar;
