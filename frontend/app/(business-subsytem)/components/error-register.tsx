import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export const ErrorRegister = () => {
  return (
    <div className="text-center flex flex-col justify-center items-center min-h-[400px] px-5 md:px-10">
      <TriangleAlert className="w-16 h-16 text-success mb-6 text-red-600" />
      <h1 className="text-2xl font-semibold mb-2">
        Something went wrong with your registration
      </h1>
      <p className="text-muted-foreground text-center mt-3">
        {
          "Unfortunately we couldn't register your business. Please try again later or contact support."
        }
      </p>
      <Link
        href="/"
        className="mt-10 bg-black text-white p-4 rounded-md w-full"
      >
        Go back to home
      </Link>
    </div>
  );
};
