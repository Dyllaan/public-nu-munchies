import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import MobileRemoveIP from "./MobileRemoveIP";
import LoadingInPage from "../../../reusable/LoadingInPage";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";


export function MobileManageIP({filteredData, loading, handleRemoval} : {filteredData:any, loading:any; handleRemoval:any;}) {
  
    const { requestLoading } = useUserSubsystem();

    if(requestLoading) {
        return <LoadingInPage />;
    }

    function renderItems(data:any) {
        return data.map((ipObj:any, index:any) => (
            <div key={index}>
            <MobileRemoveIP key={index} ip={ipObj} removeIP={handleRemoval} />
            </div>
        ));
    }
  
    return (
        <ScrollArea className="rounded-md border">
        <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Allowed Addresses</h4>
            <div className="flex flex-col">
                {filteredData && filteredData.length > 0 && renderItems(filteredData)}
            </div>
        </div>
        </ScrollArea>
    )
}
