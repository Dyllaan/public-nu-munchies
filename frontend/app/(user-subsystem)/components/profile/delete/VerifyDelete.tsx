// use client
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import DeleteModal from './DeleteModal';
import LoadingInPage from '../../reusable/LoadingInPage';
/**
 * @author Louis Figes
 * 
 * Made to show ip or email verification
 * could be expanded to include other types
 * this works as the endpoint handles the type case
 */

function VerifyDelete() {
  const { user, requestLoading, checkDeleteCode } = useUserSubsystem();
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(true);

  if(requestLoading) {
    return <LoadingInPage />;
  }

  const handleTokenSubmission = async () => {
    await checkDeleteCode(token);
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

export default VerifyDelete;
