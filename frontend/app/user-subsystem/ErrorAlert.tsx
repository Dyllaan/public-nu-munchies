import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";

export default function ErrorAlert({ message }: { message: string }) {
    return (
        <Alert className="max-w-[400px] mx-auto mb-10">
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {message}
        </AlertDescription>
      </Alert>
    );
}