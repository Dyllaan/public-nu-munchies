import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardFooter,
  } from "@/components/ui/card";
import VerifyInPage from '../VerifyInPage';
import ChangeEmail from './ChangeEmail';
import useUserSubsystem from '@/hooks/user-subsystem/use-user-subsystem';
import LoadingInPage from '../../reusable/LoadingInPage';

export default function ProfileEmail() {
    const [ sent, setSent ] = useState(false);
    const { requestLoading } = useUserSubsystem();

    if(requestLoading) {
        return <LoadingInPage />;
    }

    return (
        <Card className="hover-scale w-full lg:w-[45vw]">
            {sent ? <VerifyInPage type="change_email" /> : <ChangeEmail setSent={setSent} />}
            <CardFooter>
                <div className="mx-auto flex flex-col gap-2">
                    {sent ? 
                    (
                        <>
                            <p>Not received a code?</p>
                            <Button variant="outline" onClick={() => setSent(false)}>
                                Change Email
                            </Button>
                        </>
                    ) : 
                    (
                        <>
                            <p>Already got a code?</p>
                            <Button variant="outline" onClick={() => setSent(true)}>
                                Verify your email
                            </Button>
                        </>
                    
                    )}
                </div>
            </CardFooter>
        </Card>
      );
}