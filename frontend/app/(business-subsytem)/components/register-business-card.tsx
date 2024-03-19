// form will definitely need to use javascript, therefore we need to use the "use client"
"use client";

// import all shadcn components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// these are libraries for validation
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// zod is a library for data validation
import { z } from "zod";
import { registerFormSchema } from "../utils/register-formschema";
import { useBusinessApi } from "@/hooks/business-subsystem/use-business-api";
import { SuccessfulRegister } from "./successful-register";
import { Dispatch, useState } from "react";
import { ErrorRegister } from "./error-register";
import { AuthRequiredCard } from "./auth-required-card";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";

// we are inferring the type of the formSchema object from zod to type called UserInput
type UserInput = z.infer<typeof registerFormSchema>;

export const RegisterBusinessCard = () => {
  const { user } = useUserSubsystem();
  return (
    <Card className="py-4 md:max-w-[550px]">
      {user.verified ? <LoggedInCards /> : <AuthRequiredCard />}
    </Card>
  );
};

const LoggedInCards = () => {
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  return (
    <>
      {(businessName as string)?.length > 0 ? (
        <SuccessfulRegister name={businessName ?? ""} />
      ) : error ? (
        <ErrorRegister />
      ) : (
        <RegisterBusinessForm
          setBusinessName={setBusinessName}
          setError={setError}
        />
      )}
    </>
  );
};

const RegisterBusinessForm = ({
  setBusinessName,
  setError,
}: {
  setBusinessName: Dispatch<string | null>;
  setError: Dispatch<boolean>;
}) => {
  const { createBusiness } = useBusinessApi();

  const [loading, setLoading] = useState(false);

  // defining the form logic using react-hook-form library
  const form = useForm<UserInput>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      businessName: "",
      businessDescription: "",
      businessAddress: "",
      businessCity: "",
      businessPostcode: "",
      businessPhoneNumber: "",
      businessEmail: "",
    },
  });

  const handleSubmit = async (data: UserInput) => {
    setLoading(true);
    try {
      // call the api hook to create the business
      data = {
        ...data,
        businessPhoneNumber: data?.businessPhoneNumber?.length
          ? `+44${data.businessPhoneNumber}`
          : "",
      };
      const res = await createBusiness(data);
      if (res.message.id) {
        setBusinessName(res.message.name);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardHeader>
          <CardTitle className="text-center">Create a new Business</CardTitle>
          <CardDescription className="text-center">
            Request a new business to be created on NU-Munchies platform
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          {/* these could be generated via some for loop but for now i am just writing them manually to keep clear what i am doing */}
          {/* these wrapper components are needed for automatic validation and error messages */}
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Restaurant" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {/* there is another one */}
          <FormField
            control={form.control}
            name="businessDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="My Restaurant is a fast food restaurant..."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Address</FormLabel>
                <FormControl>
                  <Input placeholder="1234 Main St" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="flex w-full gap-x-2">
            <FormField
              control={form.control}
              name="businessCity"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Business City</FormLabel>
                  <FormControl>
                    <Input placeholder="Newcastle Upon Tyne" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessPostcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Postcode</FormLabel>
                  <FormControl>
                    <Input placeholder="NE1 1AA" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="businessPhoneNumber"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Business Phone Number</FormLabel>
                <FormControl>
                  <>
                    <div className="absolute left-2 top-[34px] text-gray-700 text-sm px-2">
                      +44
                    </div>
                    <Input
                      placeholder="123-456-7890"
                      {...field}
                      className="pl-12"
                    />
                  </>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Email</FormLabel>
                <FormControl>
                  <Input placeholder="business@example.com" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button
            className={
              "py-6 text-md flex items-center justify-center " +
              (loading ? "!bg-gray-400 cursor-not-allowed" : "")
            }
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-4 border-t-4 border-gray-200 border-t-blue-400"></div>
            ) : (
              "Create Business"
            )}
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-center text-gray-500 text-sm">
            By submitting this form, you agree to our Terms of Service and
            Privacy Policy for business owners operating on NU-Munchies
            platform.
          </p>
        </CardFooter>
      </form>
    </Form>
  );
};
