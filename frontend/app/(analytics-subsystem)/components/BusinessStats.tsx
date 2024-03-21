'use client'
/*
Items

@author Jake McCarthy (w20043974) 
*/

import {Table,TableBody,TableCaption, TableCell,TableFooter,TableHead,TableHeader,TableRow, } from "@/components/ui/table"
import { useState, useEffect } from 'react'

function UserStats() {
const [items, setItems] = useState([]);
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`
};

    const fetchData = () => { 
        fetch("http://localhost:8080/analytics/business-stats", {
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
              <div className="font-bold">Welcome, {items.data.business_name}</div>
              <div> Your Contributions:</div>
              <div>You've Helped to Prevent {items.data.preventedWaste} kg of Food Waste Through Your {items.data.ordersReceived} Sold Orders! See More ></div>
              <div>You've Made £{items.data.totalMoneyMade} Total! See more ></div>
              <div>
              <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank:</TableHead>
              <TableHead>Name:</TableHead>
              <TableHead>Total Points:</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
        {items.data.topRanks.map((user, index) => (
      <TableRow key={index}>
        <TableCell className="font-medium">{user.rank}</TableCell>
        <TableCell>{user.business_name}</TableCell>
        <TableCell>{user.total_points}</TableCell>
      </TableRow>
            ))}
            <TableRow>
            <TableCell >Your Rank:</TableCell>
              <TableCell >{items.data.yourRank.rank}</TableCell>
              <TableCell >{items.data.yourRank.business_name}</TableCell>
              <TableCell >{items.data.yourRank.total_points}</TableCell>
            </TableRow>
            </TableBody>
        </Table>

        <div>You've Accumulated {items.data.businessPoints} Points! See Your Rewards > </div>
        </div>
        </div>
          )}
        </div>
    )
}
 
export default UserStats