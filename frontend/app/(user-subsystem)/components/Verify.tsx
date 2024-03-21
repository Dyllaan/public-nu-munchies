// use client
import { useState } from 'react';
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
  const { user, requestNewCode, requestLoading, checkCode } = useUserSubsystem();
  const [token, setToken] = useState("");

  const requestVerificationEmail = async () => {
    await requestNewCode(type);
  };

  const handleTokenSubmission = async () => {
    await checkCode(token, type);
  };

  const handleInputChange = (event:any) => {
    setToken(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className={`text-4xl font-bold`}>
        Halt there! We need to verify {title}.
      </h1>
      <div className="flex flex-col gap-2 items-center justify-center">
        <p className="mb-4">We have emailed you at: <b>{user.email}</b></p>
        {requestLoading && <LoadingInPage />}
        {!requestLoading && (
          <>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Token" onChange={handleInputChange} />
              <Button type="submit" onClick={handleTokenSubmission}>Verify me!</Button>
            </div>
            <Button variant="outline" onClick={requestVerificationEmail}>
              <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Re-send Email
            </Button>
          </>
        )}
      </div>
    </main>
  );
}

export default Verify;
