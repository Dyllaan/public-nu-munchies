"use client";
import { useBusinessApi } from "@/hooks/business-subsystem/use-business-api";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { businessesAtom } from "../stores/business";
import { useAtom } from "jotai";

import useSWR from "swr";

export const WithBusinessLoader: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { getMyBusinesses } = useBusinessApi();
  const { data } = useSWR("/api/business/my", getMyBusinesses);

  const [businesses, setBusinesses] = useAtom(businessesAtom);

  const router = useRouter();

  useEffect(() => {
    if (data?.status === "error") {
      if (data?.message.includes("token")) {
        router.replace("/login");
      }
    } else if (data?.status === "success" && data?.message.length > 0) {
      setBusinesses({
        loadedMyBusinesses: data.message,
        loadingMyBusinesses: false,
      });
    }
  }, [data]);

  return <>{children}</>;
};
