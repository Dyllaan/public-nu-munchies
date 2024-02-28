// form will definitely need to use javascript, therefore we need to use the "use client"
"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// sonner is library for showing notification toasts
import { toast } from "sonner";

// zod is a library for data validation
import { z } from "zod";

const formSchema = z.object({
  businessName: z
    .string()
    .min(3, {
      message: "Business name must be at least 3 characters long",
    })
    .max(255),
  businessDescription: z.string().min(3).max(255),
  businessAddress: z.string().min(3).max(255),
  businessCategory: z.string().min(3).max(255),
  businessPhoneNumber: z.string().min(3).max(255),
  businessEmail: z.string().email(),
  businessWebsite: z.string().url(),
});

// we are inferring the type of the formSchema object from zod to type called UserInput
type UserInput = z.infer<typeof formSchema>;

export const RegisterBusinessCard = () => {
  const form = useForm<UserInput>({
    resolver: zodResolver(formSchema),
  });

  const handleData = (data: UserInput) => {
    toast.success("Business request submitted successfully", {
      description: "Debug Data: " + JSON.stringify(data),
    });
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleData)}>
        <Card className="py-4 md:max-w-[550px]">
          <CardHeader>
            <CardTitle className="text-center">Create a new Business</CardTitle>
            <CardDescription className="text-center">
              Request a new business to be created on NU-Munchies platform
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Restaurant" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a business category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fastfood">Fast Food</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessPhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="123-456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Website</FormLabel>
                  <FormControl>
                    <Input placeholder="www.example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="py-6 text-md" type="submit">
              Submit
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-center text-gray-500 text-sm">
              By submitting this form, you agree to our Terms of Service and
              Privacy Policy for business owners operating on NU-Munchies
              platform.
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
