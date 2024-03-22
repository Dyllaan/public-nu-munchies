"use client";
import { useBusinessApi } from "@/hooks/business-subsystem/use-business-api";
import { FC } from "react";
import useSWR, { useSWRConfig } from "swr";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BusinessOrdersPage: FC<{ params: { id: string } }> = ({
  params: { id },
}) => {
  const { getBusinessOrders } = useBusinessApi();
  const { data, isLoading } = useSWR(`/api/business/orders?id=${id}`, () =>
    getBusinessOrders(id)
  );

  const { mutate } = useSWRConfig();

  const refreshOrders = () => {
    mutate(`/api/business/orders?id=${id}`);
  };

  return (
    <div className="mt-4 px-5 md:px-[10%] pb-10">
      <Breadcrumbs id={id} />
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-3xl font-semibold mb-2">Orders of Business {id}</h1>
        <Button
          className="bg-black text-white px-2 py-1 rounded-md flex gap-x-2"
          onClick={refreshOrders}
        >
          <RefreshCwIcon className="w-4 h-4 font-bold" />
          Refresh Orders
        </Button>
      </div>
      <div>
        <hr className="my-5" />
        {data?.status === "error" ? (
          <div className="text-red-500">Error: {data.message}</div>
        ) : (
          <TblComponent
            data={data}
            isLoading={isLoading}
            refreshOrders={refreshOrders}
          />
        )}
      </div>
    </div>
  );
};

const TblComponent = ({
  data,
  isLoading,
  refreshOrders,
}: {
  data: any;
  isLoading: boolean;
  refreshOrders: () => void;
}) => {
  const { acceptOrder, declineOrder } = useBusinessApi();
  const accept = async (orderId: string) => {
    await acceptOrder(orderId);
    refreshOrders();
  };

  const decline = async (orderId: string) => {
    await declineOrder(orderId);
    refreshOrders();
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Order Status</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead>User Email</TableHead>
          <TableHead>Item Name</TableHead>
          <TableHead>Item Price</TableHead>
          <TableHead>Item Collection Time</TableHead>
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
              No orders found
            </TableCell>
          </TableRow>
        )}
        {data?.message?.map((order: any) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>
              <span className="text-sm text-white bg-blue-500 px-2 py-1 rounded-md uppercase">
                {order.status}
              </span>
            </TableCell>
            <TableCell>
              {order.user?.first_name + " " + order.user?.last_name}
            </TableCell>
            <TableCell>{order.user?.email}</TableCell>
            <TableCell>{order.item?.name}</TableCell>
            <TableCell>£{order.item?.price}</TableCell>
            <TableCell>
              <span>
                {new Date(
                  order.item.collection.substring(0, 19) + "Z"
                ).toLocaleString("en-GB", {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </span>
            </TableCell>
            <TableCell className="flex gap-x-2">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                onClick={() => decline(order.id)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-green-600"
                onClick={() => accept(order.id)}
              >
                Accept
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
            Business {id} Orders
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BusinessOrdersPage;
