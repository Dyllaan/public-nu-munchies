import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import useFetchData from '@/hooks/user-subsystem/useFetchData';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import LoadingInPage from './LoadingInPage';
import { PersonIcon } from '@radix-ui/react-icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OrderHistory() {
  const { data, setEndpoint, reloadData, loading } = useFetchData("user/order-history");

  // Assuming data is an array of orders
  const count = data ? data.length : 0; // Define count based on the data length

  return (
    <Card className="hover-scale">
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {loading && <LoadingInPage />}
        {!loading && data && data.length > 0 && (
          <div className="flex flex-col gap-2">
            <Table className="w-fit">
              <TableCaption>Found {count} orders.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Order ID</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Business Name</TableHead>
                        <TableHead>Collection Time</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((order:any, index:number) => (
                        <TableRow key={index}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>£{order.item_price}</TableCell>
                            <TableCell>{order.business_name}</TableCell>
                            <TableCell>{order.collect_time}</TableCell>
                            <TableCell className="text-right">{order.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
        )}
        {!loading && data && data.length === 0 && (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>No orders found</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
