// use client
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import LoadingInPage from "../reusable/LoadingInPage";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
/**
 * @author Louis Figes
 * 
 * Made to show ip or email verification
 * could be expanded to include other types
 * this works as the endpoint handles the type case
 */

function VerifyInPage({ type } : { type: string}) {
  const title = type === 'change_email' ? 'your password' : 'your email';
  const { user, requestLoading, checkCode, requestNewCode } = useUserSubsystem();
  const [token, setToken] = useState("");

  const handleTokenSubmission = async () => {
    await checkCode(token, type);
  };

  const handleInputChange = (event:any) => {
    setToken(event.target.value);
  };

  const isValid = () => {
    const isTokenChangedAndValid = token.length > 0;
    const isValid = isTokenChangedAndValid && !requestLoading;
    return !isValid;
  };

  return (
    <>
        <CardHeader>
            <CardTitle>
                Enter your code
            </CardTitle>
            <CardDescription>
            We have emailed you at: <b>{user.email}</b>
            </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                {requestLoading && <LoadingInPage />}
                {!requestLoading && (
                <>
                    <Input type="email" placeholder="Token" onChange={handleInputChange} />
                    <Button type="submit" onClick={handleTokenSubmission} disabled={isValid()}>Verify me!</Button>
                </>
                )}
        </CardContent>
    </>
  );
}

export default VerifyInPage;
