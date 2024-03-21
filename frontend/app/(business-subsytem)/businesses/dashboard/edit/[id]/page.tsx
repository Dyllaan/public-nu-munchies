"use client";
import { useBusinessApi } from "@/hooks/business-subsystem/use-business-api";
import { FC, useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import useSWR, { useSWRConfig } from "swr";

import { Button } from "@/components/ui/button";
import { FilePlusIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateItemDialog } from "@/app/(business-subsytem)/components/create-item-dialog";
import { useAtom } from "jotai";
import { businessesAtom } from "@/app/(business-subsytem)/stores/business";
import { useRouter } from "next/navigation";

const BusinessItemsPage: FC<{ params: { id: string } }> = ({
  params: { id },
}) => {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const { getItems } = useBusinessApi();
  const { data, isLoading } = useSWR(`/api/business/items?id=${id}`, () =>
    getItems(id)
  );

  const [businesses, setBusinesses] = useAtom(businessesAtom);

  useEffect(() => {
    if (data?.status === "success") {
      setItems(data.message);
    }
    if (businesses.loadedMyBusinesses?.length) {
      if (
        businesses.loadedMyBusinesses.find((b) => b.id === id) === undefined
      ) {
        router.replace("/businesses/dashboard");
      }
    }
  });

  const { mutate } = useSWRConfig();

  const [createItemDialogOpen, setCreateItemDialogOpen] = useState(false);

  return (
    <div className="mt-4 px-[10%] pb-10">
      <Breadcrumbs id={id} />
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-3xl font-semibold mb-2">Items of Business {id}</h1>
        <Button
          className="bg-black text-white px-3 py-1 rounded-md flex gap-x-2"
          onClick={() => setCreateItemDialogOpen(true)}
        >
          <FilePlusIcon className="w-4 h-4 font-bold" />
          Create Item
        </Button>

        {createItemDialogOpen && (
          <Dialog open={createItemDialogOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <CreateItemDialog
              open={createItemDialogOpen}
              businessId={id}
              mutate={mutate}
              closeDialog={() => {
                setCreateItemDialogOpen(false);
              }}
            />
          </Dialog>
        )}
      </div>
      <div>
        <hr className="my-5" />
        {data?.status === "error" ? (
          <div className="text-red-500">Error: {data.message}</div>
        ) : (
          <TblComponent
            data={items}
            isLoading={isLoading}
            mutate={mutate}
            businessId={id}
          />
        )}
      </div>
    </div>
  );
};

const TblComponent = ({
  data,
  isLoading,
  businessId,
  mutate,
}: {
  data: any;
  isLoading: boolean;
  mutate: (key: string) => void;
  businessId: string;
}) => {
  const { deleteItem: delItemApi } = useBusinessApi();
  const deleteItem = (id: string) => {
    delItemApi(id).then((res) => {
      mutate(`/api/business/items?id=${businessId}`);
    });
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item ID</TableHead>
          <TableHead>Item Status</TableHead>
          <TableHead>Item Name</TableHead>
          <TableHead>Item Price</TableHead>
          <TableHead>Item Collection</TableHead>
          <TableHead>Item Category</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        )}
        {data?.length === 0 && !isLoading && (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              No items found
            </TableCell>
          </TableRow>
        )}
        {data?.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>
              <span className="text-sm text-white bg-blue-500 px-2 py-1 rounded-md uppercase">
                {item.status}
              </span>
            </TableCell>
            <TableCell>
              <span>{item.name}</span>
            </TableCell>
            <TableCell>£{item.price}</TableCell>
            <TableCell>
              {new Date(
                item.collection.substring(0, 19) + "Z"
              ).toLocaleString()}
            </TableCell>
            <TableCell>{item.category?.name}</TableCell>

            <TableCell className="flex gap-x-2">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-red-600"
                onClick={() => deleteItem(item.id)}
              >
                Remove
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const Breadcrumbs = ({ id }: { id: string }) => {
  return (
    <Breadcrumb className="mb-7">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/businesses">Businesses</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/businesses/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/businesses/dashboard/orders/${id}`}>
            Business {id} Items
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default BusinessItemsPage;
