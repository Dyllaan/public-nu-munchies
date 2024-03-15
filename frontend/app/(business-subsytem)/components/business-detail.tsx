import { useBusinessApi } from "@/hooks/business-subsystem/use-business-api";
import { FC } from "react";
import { BusinessResponse } from "../businesses/page";
import { BusinessDetailSkeleton } from "./business-detail-skeleton";

export const BusinessDetail: FC<{ id: string }> = async ({ id }) => {
  const { getBusiness } = useBusinessApi();
  const res = await getBusiness(id);

  const { message } = res;

  if (message === "error") {
    return <BusinessDetailSkeleton />;
  }
  const business = message as BusinessResponse;

  return (
    <>
      <div className="relative h-[400px] w-full mt-20">
        <div className="z-10 absolute inset-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-end p-10 rounded-lg">
          <h1 className="text-white text-3xl font-semibold">{business.name}</h1>
          <p className="text-white text-lg">{business.description}</p>
        </div>
        <img
          src="/business-subsystem/register-decor.jpg"
          alt="Decoration Background"
          className="absolute w-full h-full object-cover rounded-lg"
        />
      </div>
      <div>
        <div className="px-10 pt-10">
          <h2 className="text-lg uppercase font-bold text-muted-foreground mb-4">
            Info
          </h2>
          <div className="flex gap-10 flex-wrap">
            <div>
              <p>{business.email}</p>
              <p>{business.phone}</p>
            </div>
            <div>
              <p>{business.address?.address}</p>
              <p>{business.address?.city}</p>
              <p>{business.address?.postcode}</p>
              <p>{business.address?.country}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-10 border-t-1 border-gray-300 mx-10" />
      <div className="px-10 pb-10">
        <div>
          <h2 className="text-lg uppercase font-bold text-muted-foreground mb-4">
            Menu
          </h2>
          <div>
            <div className="flex-col gap-4 flex">
              <div className="flex gap-x-4 items-center flex-wrap">
                <img
                  src="/business-subsystem/menu-item.jpg"
                  alt="Menu Item"
                  className="w-full h-full md:w-40 md:h-40 rounded-lg bg-gray-200"
                />
                <div className="flex flex-col justify-between min-h-40 ">
                  <div>
                    <span className="bg-green-300 rounded-md px-2 py-1 font-semibold text-green-800 text-xs ">
                      Expiry: 01/01/2023
                    </span>
                    <h4 className="text-2xl font-bold mt-2">Menu Item 1</h4>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reduced Price</span>
                    <div>
                      <span className="text-lg font-bold">£</span>
                      <span className="text-3xl font-bold">10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
