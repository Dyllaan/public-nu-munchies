import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import useModerator from "@/hooks/user-subsystem/use-moderator";

/**
 * @author Louis Figes W21017657
 */

export default function RemoveBusiness({business, reloadData}: {business: any, reloadData: any}) {

    const [deleteInput, setDeleteInput] = useState("");

    const [open, setOpen] = useState(false);

    const { removeBusiness, sendingRequest } = useModerator();

    const isDisabled = deleteInput !== "DELETE" && sendingRequest;

    const handleDeleteInput = (e: any) => {
        setDeleteInput(e.target.value);
    }

    const handleSubmission = async() => {
        if(deleteInput === "DELETE") {
            setOpen(false);
            await removeBusiness(business.id);
            reloadData();
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Remove Business</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="mx-auto">
                    <DialogTitle>Are you sure 
                        you want to remove <span className="font-bold underline text-red-500">{business.business_name}</span></DialogTitle>
                    <DialogDescription>
                        Enter DELETE in the input below to confirm
                    </DialogDescription>
                </DialogHeader>
                <div className="w-[75%] mx-auto">
                    <Input
                        placeholder="DELETE"
                        className="items-center"
                        onChange={(e) => {handleDeleteInput(e)}}
                    />
                </div>
                <DialogFooter className="mx-auto">
                    <Button type="submit" disabled={isDisabled} onClick={handleSubmission}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
