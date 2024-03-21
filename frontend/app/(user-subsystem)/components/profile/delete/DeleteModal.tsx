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
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";

/**
 * @author Louis Figes W21017657
 */

export default function DeleteModal({open, setOpen} : {open:any, setOpen:any;}) {
  const [deleteInput, setDeleteInput] = useState("");
  const { user, deleteAccount } = useUserSubsystem();

  const isDisabled = deleteInput !== "DELETE";

  const handleDeleteInput = (e: any) => {
    setDeleteInput(e.target.value);
  }

  const handleSubmission = async () => {
    await deleteAccount();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="mx-auto">
        <DialogTitle>Are you sure you want to delete your account? <span className="font-bold underline text-red-500">{user.firstName}</span>?</DialogTitle>
        <DialogDescription>
          Enter DELETE in the input below to confirm
        </DialogDescription>
      </DialogHeader>
      <div className="w-[75%] mx-auto">
        <Input
          placeholder="Enter DELETE to confirm"
          className="items-center"
          onChange={handleDeleteInput}
        />
      </div>
      <DialogFooter className="mx-auto">
        <Button type="submit" disabled={isDisabled} onClick={handleSubmission}>Delete Account</Button>
      </DialogFooter>
    </DialogContent>
    </Dialog>
  );
}
