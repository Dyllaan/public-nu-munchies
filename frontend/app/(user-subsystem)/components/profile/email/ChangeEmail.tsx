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
import VerifyInPage from '../VerifyInPage';

export default function ChangeEmail({setSent}: {setSent: (value: boolean) => void}) {
    const { requestEmailChange, user, requestLoading } = useUserSubsystem();
    const [ email, setEmail ] = useState(user.email ?? "");
    const [error, setError] = useState("");

    const hasChanged = () => {
        return email !== user.email;
    }

    const getChanges = () => {
        if (hasChanged()) {
            return `Email: ${user.email} -> ${email}`;
        }
    };
  
    const getError = () => {
        if(hasChanged() && !validateEmail(email ?? "")) {
            return 'Email is invalid';
        }
        return '';
    }

    const handleSubmit = async() => {
      if(hasChanged() && validateEmail(email)) {
        setSent(true);
        await requestEmailChange(email);
        return;
      }
      toast.error("Email is invalid");
    }

    useEffect(() => {   
        if (email === user.email) {
            setError("");
        } else {
            setError(getError);
        }
    }, [email, user]);

  const isValid = () => {
    const isEmailChangedAndValid = validateEmail(email ?? "") && hasChanged();
    const isValid = isEmailChangedAndValid && !requestLoading;
    return !isValid;
  };

  const handleInputChange = (e:any) => {
    setEmail(e.target.value);
  }

  function getClassName(formItem:any, userItem:any) {
    if(!hasChanged()) {
      return '';
    } 
    if (validateEmail(formItem)) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Change Email</CardTitle>
        <CardDescription>
            Changing your email requires email verification from both the current email and the new email for security purposes.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
          className={getClassName(email, user.email)}
        />
        {requestLoading ? <LoadingInPage /> : <Button onClick={handleSubmit} disabled={isValid()}>Save Changes</Button>}
        </CardContent>
        <div>
            {error &&
            <p className="text-red-400 font-bold">{error}</p>
            }
            {error.length === 0 && getChanges()}
        </div>
    </>
  );
}
