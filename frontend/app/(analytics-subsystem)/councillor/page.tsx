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
const [council, setCouncil] = useState([]);
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`
};

    const fetchData = () => { 
        fetch("http://localhost:8080/analytics/councillor-dash", {
            method: 'GET',
            headers: headers
        })
        .then( response => response.json() )
        .then( json => setCouncil(json) )
        .then( json => console.log(json) )
        .catch(error => {
          console.error('Error fetching data:', error); 
    });}

    console.log(council)
 
    useEffect( fetchData, [])
    

      if (!council || !council.data) {
        return <div>Loading...</div>;
    }

    return (
      <div>

        <div>
          Hello: 
           first name insert
        </div>
      
      <Table>
        <TableCaption>A list of top users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank:</TableHead>
            <TableHead>Name:</TableHead>
            <TableHead>Total Points:</TableHead>
            <TableHead>Total Waste Prevented:</TableHead>
            <TableHead>Total Orders:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {council.data.userList.map((councils) => (
    <TableRow key={councils.rank}>
      <TableCell className="font-medium">{councils.rank}</TableCell>
      <TableCell>{councils.first_name} {councils.last_name}</TableCell>
      <TableCell>{councils.total_points}</TableCell>
      <TableCell>insert total food waste prevented in kg</TableCell>
      <TableCell>insert total orders placed</TableCell>
    </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table>
        <TableCaption>A list of top businesses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank:</TableHead>
            <TableHead>Name:</TableHead>
            <TableHead>Total Points:</TableHead>
            <TableHead>Total Waste Prevented:</TableHead>
            <TableHead>Total Orders:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {council.data.businessList.map((councils) => (
    <TableRow key={councils.rank}>
      <TableCell className="font-medium">{councils.rank}</TableCell>
      <TableCell>{councils.business_name}</TableCell>
      <TableCell>{councils.total_points}</TableCell>
      <TableCell>insert total food waste prevented in kg</TableCell>
      <TableCell>insert total orders sold</TableCell>
    </TableRow>
          ))}
        </TableBody>
      </Table>

      </div>
    )
  }

export default requireAuth(Page)