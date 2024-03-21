import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardFooter,
  } from "@/components/ui/card";
import VerifyDelete from './VerifyDelete';
import DeleteAccount from './DeleteAccount';
import useUserSubsystem from '@/hooks/user-subsystem/use-user-subsystem';
import LoadingInPage from '../../reusable/LoadingInPage';

export default function ProfileDelete() {
    const [ sent, setSent ] = useState(false);
    const { requestLoading } = useUserSubsystem();

    if(requestLoading) {
        return <LoadingInPage />;
    }

    return (
        <Card className="hover-scale w-full">
            {sent ? <VerifyDelete /> : <DeleteAccount setSent={setSent} />}
            <CardFooter>
                <div className="mx-auto flex flex-col gap-2">
                    {sent ? 
                    (
                        <>
                            <p>Not received a code?</p>
                            <Button variant="outline" onClick={() => setSent(false)}>
                                Delete User
                            </Button>
                        </>
                    ) : 
                    (
                        <>
                            <p>Already got a code?</p>
                            <Button variant="destructive" onClick={() => setSent(true)}>
                                Delete your account
                            </Button>
                        </>
                    
                    )}
                </div>
            </CardFooter>
        </Card>
      );
}