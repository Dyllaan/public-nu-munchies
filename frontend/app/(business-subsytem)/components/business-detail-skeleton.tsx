import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { AlertOctagonIcon } from "lucide-react";
import Link from "next/link";

export const BusinessDetailSkeleton: FC<{ error?: boolean }> = ({ error }) => {
  return (
    <>
      <div className="relative h-[400px] w-full mt-4">
        <div
          className={cn(
            "z-10 absolute inset-0 w-full h-full bg-gray-700 bg-opacity-50 flex flex-col justify-end p-10 rounded-lg",
            error ? "bg-red-300" : ""
          )}
        >
          {error ? (
            <>
              <AlertOctagonIcon className="w-14 h-14 text-red-400 mb-4" />
              <h1 className="text-red-400 text-3xl font-semibold">
                Business Not Found
              </h1>
              <Link
                href="/businesses"
                className="text-red-400 underline mb-2 text-lg"
              >
                Go Back to Businesses List
              </Link>
            </>
          ) : (
            <>
              <Skeleton className="w-[300px] h-[40px] mb-2" />
              <Skeleton className="w-[500px] h-[20px] mb-2" />
            </>
          )}
        </div>
      </div>
      <div>
        <div className="px-10 pt-10">
          <h2 className="text-lg uppercase font-bold text-muted-foreground mb-4">
            Info
          </h2>
          <div className="flex gap-10 flex-wrap">
            <div>
              <Skeleton className="w-[300px] h-[20px] mb-2" />
              <Skeleton className="w-[200px] h-[20px] mb-2" />
              <Skeleton className="w-[100px] h-[20px] mb-2" />
            </div>
            <div>
              <Skeleton className="w-[300px] h-[20px] mb-2" />
              <Skeleton className="w-[200px] h-[20px] mb-2" />
              <Skeleton className="w-[100px] h-[20px] mb-2" />
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
                <Skeleton className="md:w-40 md:h-40 rounded-lg w-full h-full" />
                <div className="flex flex-col justify-between min-h-40 ">
                  <div>
                    <Skeleton className="w-[150px] h-[20px] mb-2 " />
                    <Skeleton className="w-[170px] h-[30px] mt-2" />
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reduced Price</span>
                    <div>
                      <Skeleton className="w-[70px] h-[40px] mt-2" />
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
