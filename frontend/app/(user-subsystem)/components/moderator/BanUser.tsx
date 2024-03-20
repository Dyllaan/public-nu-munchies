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

export default function BanUser({ user, reloadData, isBanned }: { user: any, reloadData: any, isBanned: boolean }) {

    const [deleteInput, setDeleteInput] = useState("");
    const [open, setOpen] = useState(false);
    const { banUser, sendingRequest } = useModerator(); // Assuming you have an unbanUser function

    const isDisabled = (isBanned ? deleteInput !== "UNBAN" : deleteInput !== "BAN") || sendingRequest;

    const handleDeleteInput = (e: any) => {
        setDeleteInput(e.target.value);
    }

    const handleSubmission = async () => {
      setOpen(false);
      await banUser(user.id, !isBanned);
      reloadData();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">{isBanned ? 'Unban user' : 'Ban user'}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="mx-auto">
                    <DialogTitle>{isBanned ? 'Are you sure you want to unban' : 'Are you sure you want to ban'} <span className="font-bold underline text-red-500">{user.first_name} {user.last_name}</span>?</DialogTitle>
                    <DialogDescription>
                        Enter {isBanned ? 'UNBAN' : 'BAN'} in the input below to confirm
                    </DialogDescription>
                </DialogHeader>
                <div className="w-[75%] mx-auto">
                    <Input
                        placeholder={isBanned ? 'UNBAN' : 'BAN'}
                        className="items-center"
                        onChange={handleDeleteInput}
                    />
                </div>
                <DialogFooter className="mx-auto">
                    <Button type="submit" disabled={isDisabled} onClick={handleSubmission}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
