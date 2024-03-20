'use client'
import Header from "./layout-components/Header";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Items from './(ub-subsystem)/components/Items'

 function Home() {
  return (
    <div className="text-center">
      <Header />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        NU-MUNCHIES
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        NU-Munchies is a new food collection service giving you the option to
        get great goodies, for low prices!
      </p>
      <Items />
    </div>
  );
}

export default Home