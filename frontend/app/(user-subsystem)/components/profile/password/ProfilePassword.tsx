import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import VerifyInPage from '../VerifyInPage';
import ChangePassword from './ChangePassword';
import { Toggle } from '@/components/ui/toggle';

export default function ProfilePassword() {
    const [ sent, setSent ] = useState(false);
    return (
        <Card className="hover-scale w-full lg:w-[45vw]">
            {sent ? <VerifyInPage type="change_password" /> : <ChangePassword setSent={setSent} />}
            <CardFooter>
                <div className="mx-auto flex flex-col gap-2">
                    {sent ? 
                    (
                        <>
                            <p>Not received a code?</p>
                            <Button variant="outline" onClick={() => setSent(false)}>
                                Change Password
                            </Button>
                        </>
                    ) : 
                    (
                        <>
                            <p>Already got a code?</p>
                            <Button variant="outline" onClick={() => setSent(true)}>
                                Verify your password change
                            </Button>
                        </>
                    
                    )}
                </div>
            </CardFooter>
        </Card>
      );
}