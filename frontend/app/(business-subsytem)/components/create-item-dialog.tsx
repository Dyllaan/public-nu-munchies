import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { useBusinessApi } from "@/hooks/business-subsystem/use-business-api";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UserInput = z.infer<typeof itemFormSchema>;

const itemFormSchema = z.object({
  name: z.string().min(3).max(255),
  price: z.string().min(1).max(255),
  collection: z.date().optional(),
});

export const CreateItemDialog = ({
  businessId,
  mutate,
  closeDialog,
  open,
}: {
  open: boolean;
  businessId: string;
  mutate: (key: string) => void;
  closeDialog: () => void;
}) => {
  const { createItem } = useBusinessApi();

  const [collectionDate, setCollectionDate] = useState<Date>();
  const [collectionError, setCollectionError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: UserInput) => {
    setCollectionError(null);
    if (!collectionDate) {
      setCollectionError("Collection date is required");
      return;
    }
    if (collectionDate < new Date()) {
      setCollectionError("Collection date cannot be in the past");
      return;
    }
    if (collectionError !== null) {
      return;
    }

    setLoading(true);

    form.reset();

    await createItem({
      name: data.name,
      price: data.price,
      collection: collectionDate.toISOString(),
      business_id: businessId,
    });

    setLoading(false);

    closeDialog();

    mutate(`/api/business/items?id=${businessId}`);
  };

  const form = useForm<UserInput>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {},
  });

  return (
    <div
      className={cn(
        "flex justify-center items-center h-screen w-screen fixed inset-0 z-50",
        !open ? "hidden" : ""
      )}
      onClick={() => closeDialog()}
    >
      <DialogContent
        className="sm:max-w-[425px] py-20 md:min-w-[600px]"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-3xl">
            Create a new Item
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Create a new item for the business {businessId}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Item Name"
                      {...field}
                      className="py-6"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="py-6"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Label className="text-sm mt-4 block mb-2">Collection Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal py-6",
                    !collectionDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {collectionDate ? (
                    format(collectionDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={collectionDate}
                  onSelect={setCollectionDate}
                />
              </PopoverContent>
            </Popover>
            {collectionError && (
              <FormMessage className="text-xs text-red-500 mt-3">
                {collectionError}
              </FormMessage>
            )}

            <Button
              className={
                "bg-black text-white px-3 rounded-md w-full mt-6 py-6 text-base flex items-center justify-center " +
                (loading ? "!bg-gray-400 cursor-not-allowed" : "")
              }
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-4 border-t-4 border-gray-200 border-t-blue-400"></div>
              ) : (
                "Create Item"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </div>
  );
};
