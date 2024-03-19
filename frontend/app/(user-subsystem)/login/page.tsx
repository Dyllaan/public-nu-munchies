"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
import AgreementFooter from "../components/AgreementFooter";

// Define the login form schema using zod
const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Type inference for the login form data
type LoginFormInput = z.infer<typeof loginFormSchema>;

function LoginPage() {
    const { login } = useUserSubsystem();

    const form = useForm<LoginFormInput>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLogin = async(data: LoginFormInput) => {
        const { email, password } = data;
        const response = await login(email, password);
        if (response) {
            toast.error(response);
        }
    };

    return (
        <div className="h-[90vh]">
        <Form {...form}>
            <form className="loginPageBackground h-full items-center flex" onSubmit={form.handleSubmit(handleLogin)}>
                <Card className="py-4 md:max-w-[550px] mx-auto my-auto">
                    <CardHeader>
                        <CardTitle className="text-center">Login</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-4 items-center mx-auto">
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
                        <Button className="py-2 text-md" type="submit">
                            Login
                        </Button>
                        <p>
                            Not registered? 
                            <Link href="/register" className="underline m-1">
                                Register here
                            </Link>
                        </p>
                        <Link href="/forgot" className="underline m-1 mx-auto">Forgot password?</Link>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <GoogleSignIn />
                    </CardFooter>
                </Card>
            </form>
        </Form>
        <AgreementFooter referrer="login" />

        </div>
    );      
}
export default requireAuth(LoginPage, false);