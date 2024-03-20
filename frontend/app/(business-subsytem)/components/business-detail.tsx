import { useBusinessApi } from "@/hooks/business-subsystem/use-business-api";
import { FC } from "react";
import { BusinessResponse } from "../businesses/page";
import { BusinessDetailSkeleton } from "./business-detail-skeleton";
import { BusinessMenu } from "./business-menu";

export const BusinessDetail: FC<{ id: string }> = async ({ id }) => {
  const { getBusiness } = useBusinessApi();
  const res = await getBusiness(id);

  const { message } = res;

  if (res.status === "error") {
    return <BusinessDetailSkeleton error={true} />;
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
            {business.email && business.phone && (
              <div>
                <p>{business.email}</p>
                <p>{business.phone}</p>
              </div>
            )}
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
          <BusinessMenu businessId={id}></BusinessMenu>
        </div>
      </div>
    </>
  );
};
