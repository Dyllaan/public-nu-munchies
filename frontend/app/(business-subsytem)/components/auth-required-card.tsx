import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export const AuthRequiredCard = () => {
  return (
    <div className="text-center flex flex-col justify-center items-center min-h-[400px] px-5 md:px-10">
      <TriangleAlert className="w-16 h-16 text-success mb-6 text-red-600" />
      <h1 className="text-2xl font-semibold mb-2">
        You need to be logged in to register a business
      </h1>
      <p className="text-muted-foreground text-center mt-3">
        {
          "Please log in to register a business. If you don't have an account, you can create one for free."
        }
      </p>
      <Link
        href="/login"
        className="mt-10 bg-black text-white p-4 rounded-md w-full text-white"
      >
        Log In Now
      </Link>
    </div>
  );
};
