import { useState, useEffect } from 'react';
import { toast } from 'sonner'; // Assuming 'sonner' is a typo for a toast notification library like 'react-toastify'
import useUserSubsystem from '../../../../../hooks/user-subsystem/use-user-subsystem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { validatePassword } from '../../Validation';
import LoadingInPage from '../../reusable/LoadingInPage';
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import VerifyInPage from '../VerifyInPage';
import { Toggle } from '@/components/ui/toggle';
import { EyeOpenIcon } from '@radix-ui/react-icons';

export default function ChangePassword({setSent}: {setSent: (value: boolean) => void}) {
  const { requestLoading, requestPasswordChange } = useUserSubsystem();
  const [ password, setPassword ] = useState("");
  const [ passwordConfirm, setPasswordConfirm ] = useState("");
  const [error, setError] = useState("");
  const [canSeePassword, setCanSeePassword] = useState(false);
  
  useEffect(() => {
  }, [requestLoading])

  const getError = () => {
      if(!validatePassword(password ?? "")) {
           return 'Password is invalid';
      }
      return '';
  }

  const handleSubmit = async() => {
    if(validatePassword(password)) {
      setSent(true); 
      await(requestPasswordChange(password));
      return;
    }
    toast.error("Password is invalid");
  }

  const isValid = () => {
    const isPasswordChangedAndValid = validatePassword(password ?? "");
    const isPasswordConfirmed = password === passwordConfirm;
    const isValid = isPasswordChangedAndValid && !requestLoading && isPasswordConfirmed;
    return !isValid;
  };

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  }
  const handlePasswordConfirmChange = (e:any) => {
    setPasswordConfirm(e.target.value);
  }

  const handleCanSeeChange = () => {
    setCanSeePassword(!canSeePassword);
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
            Changing your password requires password verification for security purposes.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex">
            <Input
            id="password"
            name="password"
            type={canSeePassword ? "text" : "password"}
            placeholder="Password"
            onChange={handlePasswordChange}
            />
          <Toggle 
            className="rounded-full ml-1"
            defaultPressed={canSeePassword || false} // Convert null to false
            onPressedChange={handleCanSeeChange} 
            disabled={requestLoading}
          >
            <EyeOpenIcon />
          </Toggle>
          </div>
          <div className="flex">
          <Input
            id="confirm-password"
            name="confirm-password"
            type={canSeePassword ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={handlePasswordConfirmChange}
          />
          <Toggle 
            className="rounded-full ml-1"
            defaultPressed={canSeePassword || false} // Convert null to false
            onPressedChange={handleCanSeeChange} 
            disabled={requestLoading}
          >
            <EyeOpenIcon />
          </Toggle>
          </div>
            {requestLoading ? <LoadingInPage /> : <Button onClick={handleSubmit} disabled={isValid()}>Save Password</Button>}
          </div>
        </CardContent>
        <div>
            {error &&
            <p className="text-red-400 font-bold">{error}</p>
            }
        </div>
    </>
  );
}
