'use client'
/*
Items

@author Jake McCarthy (w20043974) 
*/

import requireAuth from "../../(user-subsystem)/components/auth/requireAuth";
import requireType from '@/app/(user-subsystem)/components/auth/requireType';
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import {Table,TableBody,TableCaption, TableCell,TableFooter,TableHead,TableHeader,TableRow, } from "@/components/ui/table"
import { useState, useEffect } from 'react'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"



function Page() {
  const { user, logout, isOAuth } = useUserSubsystem();
  const [council, setCouncil] = useState([]);
  const [showUserList, setShowUserList] = useState(true); // State to track which table to show
  const token = localStorage.getItem('token');
  const headers = {
      'Authorization': `Bearer ${token}`
  };

  const fetchData = () => { 
      fetch("http://localhost:8080/analytics/councillor-dash", {
          method: 'GET',
          headers: headers
      })
      .then(response => response.json())
      .then(json => setCouncil(json))
      .catch(error => {
          console.error('Error fetching data:', error); 
      });
  }

  useEffect(fetchData, []);

  if (!council || !council.data) {
      return <div>Loading...</div>;
  }



  
  return (
    <div>
      {showUserList && (
        <div>
          <h1 className="font-bold">Top User Ranks:</h1>
          <div className="flex justify-center">
            <Button onClick={() => setShowUserList(!showUserList)}>
              {showUserList ? "Show Business List" : "Show User List"}
            </Button>
          </div>
        </div>
      )}
  
      {!showUserList && (
        <div>
          <h1 className="font-bold">Top Business Ranks:</h1>
          <div className="flex justify-center">
            <Button onClick={() => setShowUserList(!showUserList)}>
              {showUserList ? "Show Business List" : "Show User List"}
            </Button>
          </div>
        </div>
      )}
  
      <Separator className="my-4" />
  
      {showUserList ? (
        <Table>
              <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank:</TableHead>
              <TableHead>Name:</TableHead>
              <TableHead>Total Points:</TableHead>
              <TableHead>Total Waste Prevented:</TableHead>
              <TableHead>Contact Email:</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
    {council.data.userList.map((councils) => (
      <TableRow key={councils.rank}>
        <TableCell className="font-medium">{councils.rank}</TableCell>
        <TableCell>{councils.first_name} {councils.last_name}</TableCell>
        <TableCell>{councils.total_points}</TableCell>
        <TableCell>{councils.total_Uwaste}kg</TableCell>
        <TableCell>{councils.email}</TableCell>
      </TableRow>
            ))}
          </TableBody>
        </Table>
  
            </Table>
      ) : (
        <Table>
           <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank:</TableHead>
              <TableHead>Name:</TableHead>
              <TableHead>Total Points:</TableHead>
              <TableHead>Total Waste Prevented:</TableHead>
              <TableHead>Contact Email:</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
    {council.data.businessList.map((councils) => (
      <TableRow key={councils.rank}>
        <TableCell className="font-medium">{councils.rank}</TableCell>
        <TableCell>{councils.business_name}</TableCell>
        <TableCell>{councils.total_points}</TableCell>
        <TableCell>{councils.total_Bwaste} kg</TableCell>
        <TableCell>{councils.business_email}</TableCell>
      </TableRow>
            ))}
          </TableBody>
        </Table>
  
        </Table>
      )}
    </div>
  );
  
  
}

export default  requireType(Page, 'councillor');
