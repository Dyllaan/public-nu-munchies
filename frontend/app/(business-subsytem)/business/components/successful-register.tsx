import { CheckCircleIcon } from "lucide-react";

import Link from "next/link";

export const SuccessfulRegister = ({ name }: { name: string }) => {
  return (
    <div className="text-center flex flex-col justify-center items-center min-h-[400px] px-5 md:px-10">
      <CheckCircleIcon className="w-16 h-16 text-success mb-6 text-green-600" />
      <h1 className="text-2xl font-semibold mb-2">
        Nice to have you on board, {name}!
      </h1>
      <p className="text-muted-foreground text-center mt-3">
        You have successfully registered your business. It might take a few days
        for your business to be verified. We will send you an email once your
        business is verified.
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
