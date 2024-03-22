'use client'
/*
Items

@author Jake McCarthy (w20043974) 
*/

import {Table,TableBody,TableCaption, TableCell,TableFooter,TableHead,TableHeader,TableRow, } from "@/components/ui/table"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Separator } from "@/components/ui/separator"


function UserStats() {
const [items, setItems] = useState([]);
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`
};

    const fetchData = () => { 
        fetch("http://localhost:8080/analytics/user-stats", {
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

<div>
          <h2 className="text-3xl font-bold mb-2">Welcome, {items.data.userFirstName}!</h2>
          <Separator className="my-6" />
          {items && (
            <div className=" my-2 rounded mb-2">
              <h3 className="">Your Contributions:</h3>

              <div class="min-w-screen flex items-center justify-center">
    <div class="max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-10 lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4  ">

            <div class="w-full lg:w-1/4 shadow-lg">
                <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-yellow-400">
                    <div class="flex items-center">
                        <div class="icon w-14 p-3.5 bg-yellow-400 text-white rounded-full mr-3">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center">
                            <div class="text-lg ">{items.data.preventedWaste} kg</div>
                            <div class="text-sm text-gray-400">Food Waste Prevented</div>
                            <Button className= "mt-2" asChild>
                              <Link href="/user-orders">See More ></Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full lg:w-1/4 shadow-lg">
                <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-red-400">
                    <div class="flex items-center">
                        <div class="icon w-14 p-3.5 bg-red-400 text-white rounded-full mr-3">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center">
                            <div class="text-lg">{items.data.ordersPlaced}</div>
                            <div class="text-sm text-gray-400">Orders Placed</div>
                            <Button className= "mt-2" asChild>
                              <Link href="/user-orders">See More ></Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full lg:w-1/4 shadow-lg">
                <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-blue-400">
                    <div class="flex items-center">
                        <div class="icon w-14 p-3.5 bg-blue-400 text-white rounded-full mr-3">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center">
                            <div class="text-lg">{items.data.businessesHelped}</div>
                            <div class="text-sm text-gray-400">Businesses Helped</div>
                            <Button className= "mt-2" asChild>
                              <Link href="/businesses-helped">See More ></Link>
                            </Button>
                        </div>
                    </div>
                </div>
                </div>
                

                <div class="w-full lg:w-1/4 shadow-lg">
                <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-purple-400">
                    <div class="flex items-center">
                        <div class="icon w-14 p-3.5 bg-purple-400 text-white rounded-full mr-3">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center">
                            <div class="text-lg">{items.data.userPoints}</div>
                            <div class="text-sm text-gray-400">Total Points</div>
                            <Button className= "mt-2" asChild>
                              <Link href="/user-rewards">See Your Rewards -></Link>
                            </Button>
                        </div>
                    </div>
                </div>
                </div>
                </div>
                </div>
    </div>
    <div>
              <div className="pt-8 pb-8"> 
                <h3 className="pb-2">Top User Ranks:</h3>
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
      <TableCell className={user.rank === items.data.userRank.rank ? "font-bold" : "font-medium"}>{user.rank}</TableCell>
      <TableCell className={user.rank === items.data.userRank.rank ? "font-bold" : ""}>{user.first_name} {user.last_name}</TableCell>
      <TableCell className={user.rank === items.data.userRank.rank ? "font-bold" : ""}>{user.total_points}</TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
        </div>
        <div>
        <h3 className="pb-2">Your Rank:</h3>
        <Table>
        <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank:</TableHead>
              <TableHead>Total Points:</TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>
            <TableRow>
              <TableCell className="font-bold">{items.data.userRank.rank}</TableCell>
              <TableCell className="font-bold">{items.data.userRank.total_points}</TableCell>
            </TableRow>
            </TableBody>
        </Table>
        </div>




        </div>
        </div>
          )}
        </div>
    )
}
 
export default UserStats