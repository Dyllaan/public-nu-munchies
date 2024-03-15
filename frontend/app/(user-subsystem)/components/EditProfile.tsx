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
import useUserSubsystem from "../../../hooks/user-subsystem/use-user-subsystem";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PersonIcon } from "@radix-ui/react-icons"
import InlineEditableField from "./EditableField";
import React, { useState, useEffect } from 'react';
// Modify the form schema for profile editing (make all fields optional and remove passwordConfirmation)
const profileEditSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }).optional(),
    lastName: z.string().min(1, { message: "Last name is required" }).optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
});


type ProfileEditFormInput = z.infer<typeof profileEditSchema>;

export default function EditProfile() {
    const { editUser, user } = useUserSubsystem();
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const form = useForm<ProfileEditFormInput>({
        resolver: zodResolver(profileEditSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
        },
    });

    const handleSave = (name:any, newValue:any) => {
        form.setValue(name, newValue);
        setHasUnsavedChanges(true); // Indicate that there are unsaved changes
    };

    const handleEdit = async (data: any) => {

        console.log("here");
        const response = await editUser(data);
        if (response) {
            toast.error(response);
        } else {
            // Reset unsaved changes indicator on successful update
            setHasUnsavedChanges(false);
        }
    };

    return (
        <>
            <div>
                <h2>
                    Want to change your password or email?
                    <Link href="/settings" className="underline m-1">
                        Go to Settings
                    </Link>
                </h2>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleEdit)}>
                    <InlineEditableField
                        name="firstName"
                        label={user.firstName || "First Name"}
                        onSave={(newValue) => handleSave('firstName', newValue)}
                    />
                    <InlineEditableField
                        name="lastName"
                        label={user.lastName || "Last Name"}
                        onSave={(newValue) => handleSave('lastName', newValue)}
                    />
                    <InlineEditableField
                        name="email"
                        label={user.email || "Email"}
                        onSave={(newValue) => handleSave('email', newValue)}
                    />            
                    <Button onClick={handleEdit} className="mt-4" disabled={!hasUnsavedChanges}>Update Profile</Button>
                </form>
            </Form>
        </>
    );
}
