'use client'
/*
Items

@author Jake McCarthy (w20043974) 
*/

import requireAuth from "../../(user-subsystem)/components/requireAuth";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import {Table,TableBody,TableCaption, TableCell,TableFooter,TableHead,TableHeader,TableRow, } from "@/components/ui/table"
import { useState, useEffect } from 'react'
import { Separator } from "@/components/ui/separator"

function Page() {
const { user, logout, isOAuth } = useUserSubsystem();
const [help, setHelp] = useState([]);
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`
};

    const fetchData = () => { 
        fetch("http://localhost:8080/analytics/businesses-helped", {
            method: 'GET',
            headers: headers
        })
        .then( response => response.json() )
        .then( json => setHelp(json) )
        .then( json => console.log(json) )
        .catch(error => {
          console.error('Error fetching data:', error); 
    });}

    console.log(help)
 
    useEffect( fetchData, [])
    

      if (!help || !help.data) {
        return <div>Loading...</div>;
    }

    return (
      <div><h1 className="text-3xl font-bold mb-2">Businesses Helped:</h1>
        <div>
        <div class="min-w-screen flex items-center justify-center">
    <div class="max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
    <div class="flex justify-center items-center">

        <div class="w-1/4 lg:w-1/1 shadow-lg">
                <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-blue-400">
                    <div class="flex items-center">
                    <div class="icon w-14 p-3.5 bg-blue-400 text-white rounded-full mr-3">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center">
                            <div class="text-lg">{help.data.totalHelped}</div>
                            <div class="text-sm text-gray-400">Businesses Helped</div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
                </div>
            </div>
            </div>
            <div>
            <Separator className="my-4" />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name Of Business:</TableHead>
              <TableHead>Total Number of Purchases:</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
    {help.data.businessesHelped.map((helps) => (
      <TableRow key={helps.purchase_amount}>
        <TableCell className="font-medium">{helps.business_name}</TableCell>
        <TableCell>{helps.purchase_amount}</TableCell>
      </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Businesses Helped</TableCell>
              <TableCell className="text-right">{help.data.totalHelped}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
  
        </div>
        </div>
      )
    }
  
  export default requireAuth(Page)