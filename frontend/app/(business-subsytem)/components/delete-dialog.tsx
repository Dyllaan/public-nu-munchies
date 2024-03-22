import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const DeleteDialog = ({
  open,
  onCorrect,
  onCancel,
  businessId,
}: {
  open: boolean;
  onCorrect: () => void;
  onCancel: () => void;
  businessId: string;
}) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.stopPropagation();
    if (Number(input) === Number(businessId)) {
      onCorrect();
    } else {
      setError("The business id is incorrect");
    }
  };

  return (
    <>
      {open && (
        <div
          className="flex justify-center items-center h-screen w-screen fixed inset-0 z-50"
          onClick={() => onCancel()}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onCancel();
            }
            if (e.key === "Enter") {
              onSubmit(e);
            }
          }}
        >
          <Dialog open={open}>
            <DialogContent
              className="py-20"
              onClick={(e) => e.stopPropagation()}
            >
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold mb-6">
                  Are you sure you want to delete this business?
                </DialogTitle>
                <DialogDescription className="text-center text-base mb-12">
                  This action cannot be undone. This will permanently delete the
                  business with id{" "}
                  <span className="font-bold text-blue-600">{businessId}</span>.
                  If you are sure write the id of the business in the input
                  below and click confirm.
                </DialogDescription>
              </DialogHeader>
              <Input
                placeholder={businessId.toString()}
                className="mt-6 text-center text-lg border-2 border-gray-200 py-6 px-4 rounded-md w-[100px] mx-auto"
                onChange={(e) => setInput(e.target.value)}
              />
              {error && (
                <div className="text-red-500 text-center mt-4">{error}</div>
              )}
              <Button
                type="submit"
                onClick={onSubmit}
                className="w-full mt-10 text-lg py-7 bg-black text-white rounded-md"
              >
                Confirm
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
};
