// EditProfile.js
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'sonner'; // Assuming 'sonner' is a typo for a toast notification library like 'react-toastify'
import { z } from 'zod';
import useUserSubsystem from '../../../hooks/user-subsystem/use-user-subsystem';
import InlineEditableField from './EditableField';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const profileEditSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).optional(),
  lastName: z.string().min(1, { message: "Last name is required" }).optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).optional(),
  passwordConfirmation: z.string().min(6, { message: "Password confirmation must be at least 6 characters" }).optional(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

type ProfileFormInput = z.infer<typeof profileEditSchema>;

export default function EditProfile() {
  const { editUser, user } = useUserSubsystem();
  const form = useForm({
    resolver: zodResolver(profileEditSchema),
    defaultValues: user ? {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      password: '',
      passwordConfirmation: '',
    } : {},
  });

  const handleProfileUpdate = async (data:ProfileFormInput) => {
    console.log("hi");
    const response = await editUser(data);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success("Profile updated successfully");
    }
  };

  return (
    <Card className="hover-scale">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleProfileUpdate)} className="space-y-4">
            <InlineEditableField name="firstName" label="First Name" />
            <InlineEditableField name="lastName" label="Last Name" />
            <InlineEditableField name="email" label="Email" type="email" />
            <InlineEditableField name="password" label="Password" type="password" />
            <InlineEditableField name="passwordConfirmation" label="Confirm Password" type="password" />
            <Button type="submit">Update Profile</Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
