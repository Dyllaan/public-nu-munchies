'use client'
/*
Items

@author Jake McCarthy (w20043974) 
*/

import requireAuth from "../../(user-subsystem)/components/requireAuth";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import {Table,TableBody,TableCaption, TableCell,TableFooter,TableHead,TableHeader,TableRow, } from "@/components/ui/table"
import { useState, useEffect } from 'react'

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
        <div>
  
          <div>
            Total Businesses helped: {help.data.totalHelped}
          </div>
        
        <Table>
          <TableCaption>A list of your total businesses helped</TableCaption>
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
      )
    }
  
  export default requireAuth(Page)