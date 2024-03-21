import { useState, useEffect } from 'react';
import { toast } from 'sonner'; // Assuming 'sonner' is a typo for a toast notification library like 'react-toastify'
import { z } from 'zod';
import useUserSubsystem from '../../../../hooks/user-subsystem/use-user-subsystem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { validateName } from '../Validation';
import LoadingInPage from '../reusable/LoadingInPage';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import ChangeEmail from './email/ChangeEmail';

export default function EditProfile() {
  const { editUser, user, requestLoading } = useUserSubsystem();
  const [ firstName, setFirstName ] = useState(user.firstName);
  const [ lastName, setLastName ] = useState(user.lastName);
    const changedVariables: { firstName?: string, lastName?: string } = {};
    const [errors, setErrors] = useState<string[]>([]);

    const getChangedVariables = () => {
        if (hasChanged(firstName, user.firstName)) {
            changedVariables.firstName = firstName;
        }
        if (hasChanged(lastName, user.lastName)) {
            changedVariables.lastName = lastName;
        }
        return changedVariables;
    };


  const getAllChanges = () => {
    const changes = [];
    if (hasChanged(firstName, user.firstName)) {
      changes.push(`First Name: ${user.firstName} -> ${firstName}`);
    }
    if (hasChanged(lastName, user.lastName)) {
        changes.push(`Last Name: ${user.lastName} -> ${lastName}`);
      }
    if(changes.length === 0) {
      return 'No changes made';
    } else {
      return (
        <div>
          <h4>Changes</h4>
          <ul>
            {changes.map(change => (
              <li key={change}>{change}</li>
            ))}
          </ul>
        </div>
      )
    }
  };
  
  const getErrors = () => {
    const errors = [];
    if(hasChanged(firstName, user.firstName) && !validateName(firstName)) {
        errors.push('First Name must be at least 3 characters and less than 20');
    }
    if(hasChanged(lastName, user.lastName) && !validateName(lastName)) {
        errors.push('Last Name must be at least 3 characters and less than 20');
    }
    return errors;
  }

  const hasChanged = (formItem:any, userItem:any) => {
    return formItem !== (userItem);
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    const changes = getAllChanges();
        if (changes === 'No changes made') {
            setErrors(['No changes made']);
        } else {
        await editUser(getChangedVariables());
    };
}

useEffect(() => {
    if (firstName === user.firstName && lastName === user.lastName) {
        setErrors([]);
    } else {
        setErrors(getErrors());
    }
}, [firstName, lastName, user]);
  

  const isValid = () => {
    const isFirstNameChangedAndValid = validateName(firstName) && hasChanged(firstName, user.firstName);
    const isLastNameChangedAndValid = validateName(lastName) && hasChanged(lastName, user.lastName);
    
    const isValid = (isFirstNameChangedAndValid || isLastNameChangedAndValid) && !requestLoading;
    return !isValid;
  };

  const handleInputChange = (e:any) => {
    setErrors(getErrors());
    const { name, value } = e.target;
    if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    }
  }
  function getClassName(formItem:any, userItem:any) {
    if(!hasChanged(formItem, userItem)) {
      return '';
    } 
    if (validateName(formItem)) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }

  return (
    <Card className="hover-scale w-full">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Label>First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={handleInputChange}
          className={getClassName(firstName, user.firstName)}
        />
        <Label>Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="lastName"
          value={lastName}
          onChange={handleInputChange}
          className={getClassName(lastName, user.lastName)}
        />
        {requestLoading ? <LoadingInPage /> : <Button onClick={handleSubmit} disabled={isValid()}>Save Changes</Button>}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
        <div>
          {errors && errors.map(error => (
            <p className="text-red-400 font-bold" key={error}>{error}</p>
          ))}

          {errors.length === 0 && getAllChanges()}
        
        </div>
        </CardFooter>
    </Card>
  );
}
