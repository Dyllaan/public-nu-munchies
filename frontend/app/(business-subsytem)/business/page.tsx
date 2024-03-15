import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

export default function BusinessSubsystem() {
  return (
    <div className="text-center flex flex-col justify-center items-center min-h-screen px-5 md:px-10">
      <div className="border-2 border-gray-200 p-20 rounded-md bg-white w-max flex flex-col items-center shadow-md max-w-full">
        <div className="bg-gray-200 p-6 rounded-full mb-6 w-max">
          <BriefcaseBusiness className="w-14 h-14" />
        </div>
        <h1 className="text-3xl font-bold mb-2">
          Welcome to Business Subsystem
        </h1>
        <p className="text-muted-foreground text-center mt-3 text-lg mb-10">
          This is the business subsystem. It is responsible for handling
          business related operations.
        </p>

        <ul className="flex flex-col gap-y-2">
          <li>
            <Link href="/businesses" className="text-blue-500 hover:underline">
              View Businesses
            </Link>
          </li>
          <li>
            <Link
              href="/business/create"
              className="text-blue-500 hover:underline"
            >
              Register Business
            </Link>
          </li>
          <li>
            <Link
              href="/businesses/dashboard"
              className="text-blue-500 hover:underline"
            >
              View My Businesses
            </Link>
          </li>
          <li>
            <Link href="/business/my" className="text-blue-500 hover:underline">
              Manage Business Items
            </Link>
          </li>
          <li>
            <Link href="/business/my" className="text-blue-500 hover:underline">
              Manage Business Orders
            </Link>
          </li>

          <li>
            <Link
              href="/businesses/dashboard"
              className="text-blue-500 hover:underline"
            >
              Business Dashboard (requires authentication)
            </Link>
          </li>
        </ul>
        <Link
          href="/"
          className="mt-10 h-14 bg-black text-white p-4 rounded-md w-full"
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
}
