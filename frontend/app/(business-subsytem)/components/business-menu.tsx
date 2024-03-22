"use client";
import { useBusinessApi } from "@/hooks/business-subsystem/use-business-api";
import { FC, useEffect } from "react";

import { format, formatDistance, formatRelative, subDays } from "date-fns";

import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const BusinessMenu: FC<{ businessId: string }> = ({ businessId }) => {
  const { getItems } = useBusinessApi();
  const { data, isLoading, error } = useSWR(
    "/api/business/items/" + businessId,
    () => getItems(businessId)
  );

  return (
    <div>
      <div className="flex-col gap-4 flex">
        {isLoading ? (
          <div className="flex gap-x-4 items-center flex-wrap">
            <div className="flex flex-col justify-between min-h-40 ">
              <div>
                <Skeleton className="h-[20px] rounded-md px-2 py-1 font-semibold text-green-800 text-xs " />

                <Skeleton className="text-2xl font-bold mt-2 h-[30px] w-[150px]" />
              </div>
              <div>
                <div className="flex items-end gap-x-3">
                  <span className="text-lg font-bold">£</span>
                  <Skeleton className="text-3xl font-bold h-[40px] w-[70px]" />
                </div>
              </div>
            </div>
          </div>
        ) : data?.status === "success" && data?.message.length > 0 ? (
          data.message.map((item: any) => (
            <div className="flex gap-x-4 items-center flex-wrap" key={item.id}>
              <div className="flex flex-col justify-between w-full">
                <div>
                  <span
                    className={cn(
                      "rounded-md px-2 py-1 font-semibold  text-xs",
                      new Date(item.collection.substring(0, 19) + "Z") >
                        new Date()
                        ? "text-green-800 bg-green-200"
                        : "text-red-800 bg-red-200"
                    )}
                  >
                    Collection:{" "}
                    {formatDistance(
                      new Date(item.collection.substring(0, 19) + "Z"),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </span>
                  <h4 className="text-2xl font-bold mt-2">{item.name}</h4>
                  <h5 className="text-sm mt-1">{item.category?.name}</h5>
                </div>
                <div>
                  <span className="text-muted-foreground">Reduced Price</span>
                  <div>
                    <span className="text-lg font-bold">£</span>
                    <span className="text-3xl font-bold">{item.price}</span>
                  </div>
                </div>
                <hr className="mt-4 w-full border-t-1 border-gray-400" />
              </div>
            </div>
          ))
        ) : (
          <div>
            <h3 className="text-muted-foreground">No items found</h3>
          </div>
        )}
      </div>
    </div>
  );
};
