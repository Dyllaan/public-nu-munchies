'use client'
/*
Items

@author Jake McCarthy (w20043974) 
*/

import {Table,TableBody,TableCaption, TableCell,TableFooter,TableHead,TableHeader,TableRow, } from "@/components/ui/table"
import { useState, useEffect } from 'react'
import requireType from "@/app/(user-subsystem)/components/requireType";

function Councilor() {
const [items, setItems] = useState([]);
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`
};

    const fetchData = () => { 
        fetch("http://localhost:8080/analytics/councilor-dash", {
            method: 'GET',
            headers: headers
        })
        .then( response => response.json() )
        .then( json => setItems(json) )
        .then( json => console.log(json) )
        .catch(error => {
          console.error('Error fetching data:', error); 
    });}

    console.log(items)
 
    useEffect( fetchData, [])
    

      if (!items || !items.data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-[#eaeaea] my-2 rounded">
          {items && (
            <div className="mb-2">
              <div className="font-bold">Welcome, {items.data.userFirstName}</div>
              
              <div>Top Users:</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank:</TableHead>
              <TableHead>Business Name:</TableHead>
              <TableHead>Total Points:</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
    {orders.data.orderStats.map((order) => (
      <TableRow key={order.order_number}>
        <TableCell className="font-medium">{order.rank}</TableCell>
        <TableCell>{order.business_name}</TableCell>
        <TableCell>{order.total points}</TableCell>
      </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Your Rank:</TableCell>
              <TableCell >{orders.data.rank}</TableCell>
              <TableCell >{orders.data.name}</TableCell>
              <TableCell >{orders.data.totalPoints}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <div>Top Businesses:</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank:</TableHead>
              <TableHead>Business Name:</TableHead>
              <TableHead>Total Points:</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
    {orders.data.orderStats.map((order) => (
      <TableRow key={order.order_number}>
        <TableCell className="font-medium">{order.rank}</TableCell>
        <TableCell>{order.business_name}</TableCell>
        <TableCell>{order.total points}</TableCell>
      </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Your Rank:</TableCell>
              <TableCell >{orders.data.rank}</TableCell>
              <TableCell >{orders.data.name}</TableCell>
              <TableCell >{orders.data.totalPoints}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <div>You've Accumulated {items.data.userPoints} Points! See Your Rewards > </div>

        </div>
          )
        }
        </div>
      )
    }
    
 
export default requireType(Councilor, 'councillor');