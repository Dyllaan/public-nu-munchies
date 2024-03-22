"use client";
import { IBusiness, MyBusinessCard } from "../../components/my-business-card";

import { MyBusinessCardLoading } from "../../components/my-business-card-loading";
import { useAtom } from "jotai";
import { businessesAtom } from "../../stores/business";
import { useBusinessApi } from "@/hooks/business-subsystem/use-business-api";
import { useEffect } from "react";

import useSWR from "swr";
import Link from "next/link";

export default function BusinessSubsystem() {
  // use "cached" value from what was fetched via provider
  const [businesses, setBusinesses] = useAtom(businessesAtom);

  const { getMyBusinesses } = useBusinessApi();
  const { data } = useSWR("/api/business/my", getMyBusinesses);

  // revalidating if the data count is different from the loaded businesses
  useEffect(() => {
    if (
      data?.status === "success" &&
      data?.message.length != businesses?.loadedMyBusinesses?.length
    ) {
      setBusinesses({
        loadedMyBusinesses: data.message,
        loadingMyBusinesses: false,
      });
    }
  }, [data]);

  return (
    <div className="mt-4 px-5 md:px-[10%]">
      <h1 className="text-3xl font-bold">Business Dashboard</h1>
      <h2 className="uppercase font-bold text-muted-foreground text-lg mt-4">
        My Businesses
      </h2>

      <div className="flex flex-wrap gap-4 mt-4">
        {!businesses.loadedMyBusinesses ? (
          <>
            <MyBusinessCardLoading />
          </>
        ) : businesses.loadedMyBusinesses.length === 0 ? (
          <p>
            You have no businesses yet.{" "}
            <Link
              href="/business/create"
              className="text-blue-500 hover:underline"
            >
              Create a new one now!
            </Link>
          </p>
        ) : (
          businesses.loadedMyBusinesses.map((business: IBusiness, index) => (
            <div key={index}>
              <MyBusinessCard business={business} key={business.id} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
