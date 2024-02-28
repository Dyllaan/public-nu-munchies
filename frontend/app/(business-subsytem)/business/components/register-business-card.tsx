import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const RegisterBusinessCard = () => {
  return (
    <Card className="py-4 md:max-w-[550px]">
      <CardHeader>
        <CardTitle className="text-center">Create a new Business</CardTitle>
        <CardDescription className="text-center">
          Request a new business to be created on NU-Munchies platform
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <Input placeholder="Business Name" />
        <Textarea placeholder="Business Description" />
        <Input placeholder="Business Address" />
        <Input placeholder="Business Category" />
        <Input placeholder="Business Phone Number" />
        <Input placeholder="Business Email" />
        <Input placeholder="Business Website" />
        <Button className="py-6 text-md">Submit</Button>
      </CardContent>
      <CardFooter>
        <p className="text-center text-gray-500 text-sm">
          By submitting this form, you agree to our Terms of Service and Privacy
          Policy for business owners operating on NU-Munchies platform.
        </p>
      </CardFooter>
    </Card>
  );
};
