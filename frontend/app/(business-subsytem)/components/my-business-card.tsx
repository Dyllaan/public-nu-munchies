import { Button } from "@/components/ui/button";
import { Endpoints } from "@/config/endpoints";
import { sendRequest } from "@/lib/send-request";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { PenIcon, ReceiptTextIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { businessesAtom } from "../stores/business";

export interface IBusiness {
  name: string;
  description: string;
  address:
    | {
        address: string;
        city: string;
        postcode: string;
        country: string;
      }
    | undefined;
  id: string;
  verified: boolean;
}

export const MyBusinessCard: FC<{ business: IBusiness }> = ({ business }) => {
  const [businesses, setBusinesses] = useAtom(businessesAtom);
  const forceVerification = async () => {
    const res = await sendRequest<{ id: string }>(
      Endpoints.verification,
      "POST",
      {
        id: business.id,
      }
    );
    if (res.status == "success") {
      setBusinesses({
        loadedMyBusinesses: businesses.loadedMyBusinesses?.map((b) =>
          b.id === business.id ? { ...b, verified: true } : b
        ),
        loadingMyBusinesses: false,
      });
      alert("Business verified");
    }
    return res;
  };
  return (
    <div className="w-full md:w-[24%] min-w-[320px] bg-gray-100 p-4 py-8 rounded-md border border-1 border-gray-300 relative">
      <div className="mb-6 -mt-2 flex justify-end absolute right-5 top-12 gap-x-2 z-10">
        <button className="flex gap-2 items-center rounded-lg bg-white p-2">
          <PenIcon className="w-5 h-5 text-blue-600 font-semibold" />
        </button>
        <button className="flex gap-2 items-center rounded-lg bg-white p-2">
          <TrashIcon className="w-5 h-5 text-red-600 font-semibold" />
        </button>
      </div>
      <img
        src="/business-subsystem/register-decor.jpg"
        alt="Business"
        className={cn(
          "w-full object-cover rounded-md  h-[200px] mb-5 filter",
          business?.verified ? "grayscale-0" : "grayscale"
        )}
      />
      <h2 className="text-xl font-bold">{business?.name}</h2>
      {business?.verified ? (
        <span className="bg-green-500 text-white font-semibold px-2 py-1 rounded-md text-xs mb-3 block w-max">
          Verified
        </span>
      ) : (
        <span className="bg-red-500 text-white font-semibold px-2 py-1 rounded-md text-xs mb-3 block w-max">
          Not verified
        </span>
      )}
      <p className="text-muted-foreground">{business?.description}</p>
      <p className="text-muted-foreground">{business?.address?.address}</p>

      <div className="mt-8 w-full">
        <Link
          href={`/businesses/dashboard/orders/${business.id}`}
          onClick={(e) => {
            if (!business.verified) {
              e.preventDefault();
            }
          }}
          className={cn(
            "w-full bg-black text-white p-3 text-sm rounded-md block text-center flex gap-x-2 justify-center",
            business?.verified ? "" : "bg-gray-400 cursor-not-allowed"
          )}
        >
          <ReceiptTextIcon className="w-5 h-5" />
          View Orders
        </Link>
        <Link
          href={`/businesess/dashboard/edit/${business.id}`}
          className="w-full bg-transparent border-2 border-black text-black font-semibold p-3 text-sm rounded-md block text-center mt-3"
        >
          Manage Items
        </Link>
        {!business?.verified && (
          <Button
            className="w-full bg-transparent border-2 border-gray-300 text-black mt-3 hover:bg-gray-200 text-sm bg-gray-200"
            onClick={() => forceVerification()}
          >
            Force Verify Business (test purposes)
          </Button>
        )}
      </div>
    </div>
  );
};
