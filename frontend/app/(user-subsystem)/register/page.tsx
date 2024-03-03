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

// Define the registration form schema using zod
const registrationFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  passwordConfirmation: z.string().min(6, { message: "Password confirmation must be at least 6 characters" }),
}).refine((data) => data.password === data.passwordConfirmation, { message: "Passwords must match", path: ["passwordConfirmation"] });

// Type inference for the registration form data
type RegistrationFormInput = z.infer<typeof registrationFormSchema>;

export default function RegistrationPage() {
    const { register } = useUserSubsystem();

    const form = useForm<RegistrationFormInput>({
        resolver: zodResolver(registrationFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        },
    });

    const handleRegistration = async (data: RegistrationFormInput) => {
        const { firstName, lastName, email, password } = data;
        const response = await register(firstName, lastName, email, password);
        if (response) {
            toast.error(response);
        }
    };

    return (
        <>
        <div className="m-2">
            <h2>
                Already have an account?
                <Link href="/login" className="underline m-1">
                    Login Here
                </Link>
            </h2>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegistration)}>
                <Card className="py-4 md:max-w-[550px]">
                    <CardHeader>
                        <CardTitle className="text-center">Register</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="First Name" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Last Name" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="your-email@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
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
                            Register
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </Form>
        </>
    );
}
