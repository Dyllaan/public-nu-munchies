// use client
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import LoadingInPage from "../reusable/LoadingInPage";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";

/**
 * @author Louis Figes
 * 
 * Made to show users they cant use the site any longer
 * could be expanded to include IP bans or appeal system
 */

export default function BannedScreen() {
  const { user } = useUserSubsystem();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className={`text-4xl font-bold text-red-500`}>
        Sorry, you are banned from using this site
      </h1>
      <div className="flex flex-col gap-2 items-center justify-center">
        <p className="mb-4">If you wish to appeal this, please contact <span className="font-bold">ban-appeals@numunchies.co.uk</span></p>
      </div>
    </main>
  );
}