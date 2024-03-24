'use client'
/*
Items

@author Jake McCarthy (w20043974) 
*/

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import {Table,TableBody,TableCaption, TableCell,TableFooter,TableHead,TableHeader,TableRow, } from "@/components/ui/table"
import { useState, useEffect } from 'react'
import requireAuth from "../../(user-subsystem)/components/auth/requireAuth";

function BusinessOrders() {
const { user, logout, isOAuth } = useUserSubsystem();
const [orders, setOrders] = useState([]);
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`
};

    const fetchData = () => { 
        fetch("http://localhost:8080/analytics/business-orders", {
            method: 'GET',
            headers: headers
        })
        .then( response => response.json() )
        .then( json => setOrders(json) )
        .then( json => console.log(json) )
        .catch(error => {
          console.error('Error fetching data:', error); 
    });}

    console.log(orders)
 
    useEffect( fetchData, [])
    

      if (!orders || !orders.data) {
        return <div>Loading...</div>;
    }

    return (
      <div>
      <h1 className="text-3xl font-bold mb-2">Order History:</h1>
      <Breadcrumb className="mt-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/impact-stats">Impact Stats</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="text-black">
          <BreadcrumbLink href={`/business-orders`}>
            Order History
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
      <div class="min-w-screenflex items-center justify-center">
    <div class="max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-10 lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">

            <div class="w-full lg:w-1/3 shadow-lg">
                <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-yellow-400">
                    <div class="flex items-center">
                        <div class="icon w-14 p-3.5 bg-yellow-400 text-white rounded-full mr-3">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center">
                            <div class="text-lg">{orders.data.totalWaste}kg</div>
                            <div class="text-sm text-gray-400">Food Waste Prevented</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full lg:w-1/3 shadow-lg">
                <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-red-400">
                    <div class="flex items-center">
                        <div class="icon w-14 p-3.5 bg-red-400 text-white rounded-full mr-3">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center">
                            <div class="text-lg">{orders.data.totalOrders}</div>
                            <div class="text-sm text-gray-400">Orders Received</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full lg:w-1/3 shadow-lg">
                <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-green-400">
                    <div class="flex items-center">
                        <div class="icon w-14 p-3.5 bg-green-400 text-white rounded-full mr-3">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center">
                            <div class="text-lg">£{orders.data.totalMoneyMade}</div>
                            <div class="text-sm text-gray-400">Revenue</div>
                        </div>
                    </div>
                </div>
          </div>
          </div>
          </div>
          </div>
          <div>

          <h3 className="pt-6 pb-4">Previously Fulfilled Orders:</h3>
      
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order Number:</TableHead>
            <TableHead>Customer Name:</TableHead>
            <TableHead>Item Sold:</TableHead>
            <TableHead>Order Total:</TableHead>
            <TableHead>Waste Prevented From Order:</TableHead>
            <TableHead>Order Date:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {orders.data.orderStats.map((order) => (
    <TableRow key={order.order_number}>
      <TableCell className="font-medium">{order.order_number}</TableCell>
      <TableCell>{order.customerFirstName} {order.customerLastName}</TableCell>
      <TableCell>{order.item_name}</TableCell>
      <TableCell>£{order.moneyMade}</TableCell>
      <TableCell>{order.wastePrevented}kg</TableCell>
      <TableCell><span>
                {new Date(
                  order.purchaseDate.substring(0, 19) + "Z"
                ).toLocaleString("en-GB", {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </span></TableCell>
    </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>Total Orders</TableCell>
            <TableCell className="text-right">{orders.data.totalOrders}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
</div>
</div>

    )
  }

export default requireAuth(BusinessOrders)