"use client";

import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import requireAuth from "./requireAuth";
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import LoadingInPage from "./LoadingInPage";

function VerifyEmail() {
  const { user, requestNewCode, requestLoading, checkCode} = useUserSubsystem();
  const [token, setToken] = useState("");

  const requestEmail = async () => {
    console.log("resending my g");
    await requestNewCode("ip_verification");
  }

  const showLoadingSpinner = () => {
    if (requestLoading) {
      return <LoadingInPage />;
    }
  };

  const handleTokenSubmission = async () => {
    console.log("checking my g");
    // Pass the `token` state as an argument to `checkOTP`
    await checkCode(token, "ip_verification");
  };

  // Correctly set the `token` state based on the input's value
  const handleInputChange = (event:any) => {
    setToken(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold">
        Halt there! We need to verify your IP.
      </h1>
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="mb-4">We have emailed you at: <b>{user.email}</b></p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Token" onChange={handleInputChange} />
            <Button type="submit" onClick={handleTokenSubmission}>Verify me!</Button>
          </div>
          <Button variant="outline" onClick={requestEmail}>
            <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Re-send Email
          </Button>
        </div>
    </main>
  );
}

export default VerifyEmail;
