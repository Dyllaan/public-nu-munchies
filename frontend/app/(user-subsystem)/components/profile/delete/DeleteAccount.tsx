import { useState, useEffect } from 'react';
import { toast } from 'sonner'; // Assuming 'sonner' is a typo for a toast notification library like 'react-toastify'
import useUserSubsystem from '../../../../../hooks/user-subsystem/use-user-subsystem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { validateEmail } from '../../Validation';
import LoadingInPage from '../../reusable/LoadingInPage';
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

export default function DeleteAccount({setSent}: {setSent: (value: boolean) => void}) {
  const { requestNewCode, user, requestLoading } = useUserSubsystem();

  const handleSubmit = async() => {
    setSent(true);
    await requestNewCode('delete_account');
  }
  
  return (
    <>
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
            Deleting your account requires email verification for security purposes.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {requestLoading ? <LoadingInPage /> : <Button onClick={handleSubmit}>Get Code</Button>}
        </CardContent>
    </>
  );
}
