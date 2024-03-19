"use client";
import { useBusinessApi } from "@/hooks/business-subsystem/use-business-api";
import { FC } from "react";

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

import useSWR, { mutate } from "swr";
import { Button } from "@/components/ui/button";
import { FilePlusIcon } from "lucide-react";

export const BusinessItemsPage: FC<{ params: { id: string } }> = ({
  params: { id },
}) => {
  const { getItems } = useBusinessApi();
  const { data, isLoading } = useSWR(`/api/business/items?id=${id}`, () =>
    getItems(id)
  );

  return (
    <div className="mt-32 px-[10%] pb-10">
      <Breadcrumbs id={id} />
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-3xl font-semibold mb-2">Items of Business {id}</h1>
        <Button className="bg-black text-white px-3 py-1 rounded-md flex gap-x-2">
          <FilePlusIcon className="w-4 h-4 font-bold" />
          Create Item
        </Button>
      </div>
      <div>
        <hr className="my-5" />
        {data?.status === "error" ? (
          <div className="text-red-500">Error: {data.message}</div>
        ) : (
          <TblComponent data={data} isLoading={isLoading} mutate={mutate} />
        )}
      </div>
    </div>
  );
};

export default BusinessItemsPage;

const TblComponent = ({
  data,
  isLoading,
  mutate,
}: {
  data: any;
  isLoading: boolean;
  mutate: (key: string) => void;
}) => {
  const { deleteItem: delItemApi } = useBusinessApi();
  const deleteItem = (id: string) => {
    delItemApi(id).then((res) => {
      if (res.status === "success") {
        console.log("Item deleted");
        mutate(`/api/business/items?id=${data.id}`);
      } else {
        console.log("Item not deleted");
      }
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
        {data?.message.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              No items found
            </TableCell>
          </TableRow>
        )}
        {data?.message?.map((item: any) => (
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
            <TableCell>{item.category.name}</TableCell>

            <TableCell className="flex gap-x-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">
                Edit
              </button>
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
