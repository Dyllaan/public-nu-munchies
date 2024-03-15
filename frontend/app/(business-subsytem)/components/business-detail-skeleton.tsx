import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const BusinessDetailSkeleton: FC = () => {
  return (
    <>
      <div className="relative h-[400px] w-full mt-20">
        <div className="z-10 absolute inset-0 w-full h-full bg-gray-700 bg-opacity-50 flex flex-col justify-end p-10 rounded-lg">
          <Skeleton className="w-[300px] h-[40px] mb-2" />
          <Skeleton className="w-[500px] h-[20px] mb-2" />
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
                    <Skeleton className="w-[150px] h-[20px] mb-2 bg-green-100 " />
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
