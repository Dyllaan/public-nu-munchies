"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import LoadingInPage from "./reusable/LoadingInPage";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";

/**
 * @author Louis Figes
 * 
 * Made to show ip or email verification
 * could be expanded to include other types
 * this works as the endpoint handles the type case
 */

function Verify({ type } : { type: string}) {
  const title = type === 'ip_verification' ? 'your IP' : 'your email';
  const { user, requestIPVerificationCode, requestLoading, checkCode, requestNewCode } = useUserSubsystem();
  const [token, setToken] = useState("");
  const [sent, setSent] = useState(false);

  const requestVerificationEmail = async () => {
    if(type === 'ip_verification') {
      setSent(true);
      await requestIPVerificationCode();
      return;
    }
    await requestNewCode(type);
    setSent(true);
  };

  const handleTokenSubmission = async () => {
    await checkCode(token, type);
  };

  const handleInputChange = (event:any) => {
    setToken(event.target.value);
  };

  function sentButton() {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 px-4 text-center">
          <h3>Not received the email?</h3>
          <p>Check your spam folder, or click the button to resend the email.</p>
        </div>
        <Button variant="outline" onClick={requestVerificationEmail}>
          <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Re-send Email
        </Button>
      </div>
    )
  }

  function notSentButton() {
    return (
      <Button variant="outline" onClick={requestVerificationEmail}>
        <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Send Email
      </Button>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className={`text-4xl font-bold`}>
        Halt there! We need to verify {title}.
      </h1>
      <div className="flex flex-col w-full lg:w-[45vw] gap-2 items-center justify-center">
        <p className="mb-4">We have emailed you at: <b>{user.email}</b></p>
        {requestLoading && <LoadingInPage />}
        {!requestLoading && (
          <div className="flex flex-col gap-2">
            <div className="flex w-full items-center space-x-2">
              <Input type="email" placeholder="Token" onChange={handleInputChange} />
              <Button type="submit" onClick={handleTokenSubmission}>Verify me!</Button>
            </div>
            {sent ? sentButton() : notSentButton()}
          </div>
        )}
      </div>
    </main>
  );
}

export default Verify;
