import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

export const MyBusinessCardLoading: FC = () => {
  return (
    <div className="w-full md:w-[24%] min-w-[320px] bg-gray-100 p-4 py-8 rounded-md border border-1 border-gray-300 relative">
      <Skeleton className="w-full object-cover rounded-md h-[200px] mb-5 bg-gray-300" />
      <Skeleton className="text-xl h-[28px] font-bold bg-gray-200 w-[130px]" />

      <Skeleton className="rounded-md text-xs mb-3 block w-[80px] h-[25px] bg-gray-200 mt-2" />

      <Skeleton className="w-[190px] h-[20px] bg-gray-200" />
      <Skeleton className="w-[100px] h-[20px] bg-gray-200 mt-1" />

      <div className="mt-7 w-full">
        <Skeleton className="w-full h-[45px] rounded-md block text-center flex gap-x-2 justify-center bg-gray-400" />
        <Skeleton className="w-full h-[45px] rounded-md block text-center flex gap-x-2 justify-center bg-gray-400 mt-3" />
      </div>
    </div>
  );
};
