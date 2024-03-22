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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useBusinessApi } from "@/hooks/business-subsystem/use-business-api";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ICategory {
  id: number;
  name: string;
}

export const categoriesAtom = atom<ICategory[]>([]);

type UserInput = z.infer<typeof itemFormSchema>;

const itemFormSchema = z.object({
  name: z.string().min(3).max(255),
  price: z.string().min(1).max(255),
  category: z.string().optional(),
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
  const [categories, setCategories] = useAtom(categoriesAtom);
  const { createItem, getCategories } = useBusinessApi();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: UserInput) => {
    setLoading(true);

    form.reset();

    await createItem({
      name: data.name,
      price: data.price,
      category_id: data.category,
      collection: data.collection?.toISOString(),
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

  useEffect(() => {
    if (!categories.length) {
      getCategories().then((data) => {
        setCategories(
          data.message.map((cat: { cat_id: number; cat_name: string }) => {
            return {
              id: cat.cat_id,
              name: cat.cat_name,
            };
          })
        );
      });
    }
  }, []);

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
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full py-6">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={`${category.id}`}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="collection"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Category</FormLabel>

                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal py-6",
                            field.value ? "text-black" : "text-gray-400"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

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
