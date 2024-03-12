"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// Libraries for form validation and showing notifications
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// zod library for schema validation
import { z } from "zod";

// User subsystem
import { useUserSubsystem } from "../../../hooks/user-subsystem/use-user-subsystem";

import GoogleSignIn from "../components/GoogleLogin";

import requireAuth from "../components/requireAuth";

// Define the changePassword form schema using zod
const changePasswordFormSchema = z.object({
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    passwordConfirmation: z.string().min(6, { message: "Password confirmation must be at least 6 characters" }),
  }).refine((data) => data.password === data.passwordConfirmation, { message: "Passwords must match", path: ["passwordConfirmation"] });

// Type inference for the changePassword form data
type ChangePasswordFormInput = z.infer<typeof changePasswordFormSchema>;

function ChangePasswordPage() {
    const { login } = useUserSubsystem();

    const form = useForm<ChangePasswordFormInput>({
        resolver: zodResolver(changePasswordFormSchema),
        defaultValues: {
            password: "",
            passwordConfirmation: "",
        },
    });

    const handleChangePassword = async(data: ChangePasswordFormInput) => {
       console.log("change password");
    };

    return (
        <>
        <div className="m-2">
            <h2>
                Remembered it?
                <Link href="/changePassword" className="underline m-1">
                    Login here
                </Link>
            </h2>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleChangePassword)}>
                <Card className="py-4 md:max-w-[550px]">
                    <CardHeader>
                        <CardTitle className="text-center">Change Your Password</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-4">
                    <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field}/>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password Confirmation</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Confirm Password" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                        <Button className="py-2 text-md" type="submit">
                            Reset
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </Form>
        <GoogleSignIn />
        </>
    );      
}
export default requireAuth(ChangePasswordPage, false);