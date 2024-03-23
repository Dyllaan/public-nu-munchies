'use client';
import React, { useState, useEffect } from 'react';
import requireAuth from "../../(user-subsystem)/components/auth/requireAuth";
import requireType from '@/app/(user-subsystem)/components/auth/requireType';
import UserImpactStats from '../components/UserImpactStats';
import BusinessImpactStats from '../components/BusinessImpactStats';
import { Separator } from "@/components/ui/separator";
import useDataFetching from '@/hooks/analytics-subsystem/use-analytics-subsystem';
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableBody, TableHeader, TableFooter, TableRow, TableCell } from "@/components/ui/table";

function ProfileOrders() {
  const { data: userData, isLoading: userLoading, error: userError } = useDataFetching("http://localhost:8080/analytics/user-orders");
  const { data: businessData, isLoading: businessLoading, error: businessError } = useDataFetching("http://localhost:8080/analytics/business-orders");
  const [showUserStats, setShowUserStats] = useState(true);

  useEffect(() => {
      const storedShowUserStats = localStorage.getItem('showUserStats');
      setShowUserStats(storedShowUserStats ? JSON.parse(storedShowUserStats) : true);
  }, []);

  const toggleStats = () => {
      const newValue = !showUserStats;
      setShowUserStats(newValue);
      localStorage.setItem('showUserStats', JSON.stringify(newValue));
  };

  if (userLoading || businessLoading) {
      return <div>Loading...</div>;
  }

  if (userError || businessError) {
      return <div>Error: {userError || businessError.message}</div>;
  }

  if ((!userData || !userData.data) && (!businessData || !businessData.data)) {
      return <div>No data available</div>;
  }

  return (
    <>
      {showUserStats ? (
          
          <div>
          <div>

<h3 className="pt-6 pb-4">All Previous Orders:</h3>

<Table>
<TableHeader>
<TableRow>
  <TableHead className="w-[100px]">Order Number:</TableHead>
  <TableHead>Business Name:</TableHead>
  <TableHead>Item Purchased:</TableHead>
  <TableHead>Order Total:</TableHead>
  <TableHead>Waste Prevented From Order:</TableHead>
  <TableHead>Order Date:</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{userData.data.orderStats.map((order) => (
<TableRow key={order.order_number}>
<TableCell className="font-medium">{order.order_number}</TableCell>
<TableCell>{order.business_name}</TableCell>
<TableCell>{order.item_name}</TableCell>
<TableCell>£{order.price}</TableCell>
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
  <TableCell className="text-right">{userData.data.totalOrders}</TableCell>
</TableRow>
</TableFooter>
</Table>
</div>
      </div>
              
          ) : (
            businessData && (
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
        {businessData.data.orderStats.map((order) => (
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
                  <TableCell className="text-right">{businessData.data.totalOrders}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
      </div>
                )
            )}
            
        </>
    );
}

export default ProfileOrders;
