// Adjust the import paths as necessary
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useUserSubsystem } from "../../../hooks/user-subsystem/use-user-subsystem";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PersonIcon } from "@radix-ui/react-icons"
import InlineEditableField from "./EditableField";
import React, { useState, useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
// Modify the form schema for profile editing (make all fields optional and remove passwordConfirmation)
const profileEditSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }).optional(),
    lastName: z.string().min(1, { message: "Last name is required" }).optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }).optional(),
    passwordConfirmation: z.string().min(6, { message: "Password confirmation must be at least 6 characters" }).optional(),
});


type ProfileEditFormInput = z.infer<typeof profileEditSchema>;

export default function EditProfile() {
    const { editUser, user } = useUserSubsystem();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changes, setChanges] = useState([]);

    const form = useForm<ProfileEditFormInput>({
        resolver: zodResolver(profileEditSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        },
    });

    const handleProfileUpdate = async (data: ProfileEditFormInput) => {
        // You may want to filter out empty strings or null values before sending
        const response = await editUser(data);
        if (response) {
            toast.error(response);
        }
    };

    return (
        <>
        <div className="m-2">
            <h2>
                Want to change your password or email?
                <Link href="/settings" className="underline m-1">
                    Go to Settings
                </Link>
            </h2>
        </div>
        <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleProfileUpdate)}>
                    <InlineEditableField
                        name="firstName"
                        label={user.firstName || "First Name"}
                        onSave={(newValue) => console.log('Save new value:', newValue)}
                    />
                    <InlineEditableField
                        name="lastName"
                        label={user.lastName || "Last Name"}
                        onSave={(newValue) => console.log('Save new value:', newValue)}
                    />
                    <InlineEditableField
                        name="email"
                        label={user.email || "Email"}
                        onSave={(newValue) => console.log('Save new value:', newValue)}
                    />
                    <InlineEditableField
                        name="password"
                        label="Password"
                        onSave={(newValue) => console.log('Save new value:', newValue)}
                    />
                </form>
            </FormProvider>
        {isModalOpen && (
            <Alert>
            <PersonIcon className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>
          
        )}
        </>
    );
}
