import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

export default function BusinessSubsystem() {
  return (
    <div className="text-center flex flex-col justify-center items-center min-h-screen px-5 md:px-[10%] md:-mt-20">
      <div className="border-2 border-gray-100 py-16 px-5 md:p-20 rounded-md bg-white w-max flex flex-col items-center shadow-md max-w-full">
        <div className="bg-gray-200 p-6 rounded-full mb-6 w-max">
          <BriefcaseBusiness className="w-14 h-14" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome to the Business Subsystem
        </h1>
        <h2>Author: w21020340 - Filip Brebera</h2>
        <p className="text-muted-foreground text-center mt-3 md:text-lg mb-10 md:max-w-[450px]">
          This is the business subsystem. It is responsible for handling
          business related operations such as creating, deleting and viewing
          businesses, showing orders created by customers via the customer
          subsystem, and managing the menu of the business.
        </p>

        <ul className="flex flex-col gap-y-6">
          <li>
            <Link href="/businesses" className="text-blue-500 hover:underline">
              View Businesses
            </Link>
            <br />
            (business detail, business menu)
          </li>
          <li>
            <Link
              href="/business/create"
              className="text-blue-500 hover:underline"
            >
              Register Business - Create a business and verify it
            </Link>
            <br />
            (business registration, business verification)
          </li>
          <li>
            <Link
              href="/businesses/dashboard"
              className="text-blue-500 hover:underline"
            >
              Business Dashboard
            </Link>
            <br />
            (business management, business deletion, orders, items)
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
