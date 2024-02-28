import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* Component imported via shadcn-ui */}
      <Alert className="max-w-[400px] mx-auto mb-10">
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          This is a demo page for the frontend subsystem.
        </AlertDescription>
      </Alert>
      <h1 className="text-4xl font-bold">Welcome to Frontend</h1>
      <Link href="/demo" className="mt-6 text-lg underline">
        Go to Demo Page
      </Link>
      <Link href="/signin" className="mt-6 text-lg underline">
        Go to Login Page
      </Link>
      <Link href="/register" className="mt-6 text-lg underline">
        Go to Register page
      </Link>
    </main>
  );
}
