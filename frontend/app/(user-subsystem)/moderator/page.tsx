"use client";
import React from 'react';
import requireMod from '../components/moderator/requireMod';
import { Card, CardHeader } from '@/components/ui/card';
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import SearchTable from '../components/moderator/SearchTable';
function Moderator() {

  function renderUsers(user:any, index:number) {
    <TableRow key={index}>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.first_name}</TableCell>
        <TableCell>{user.last_name}</TableCell>
        <TableCell className="text-right">{user.verified}</TableCell>
      </TableRow>
  }

  return (
    <div className="m-2 justify-center">
      <h1 className="text-center">Moderator</h1>
      <Card>
        <CardHeader>Search for Users</CardHeader>
      </Card>
      <div className="flex flex-col xl:flex-row justify-center">
      <SearchTable
  endpoint="moderator/users"
  renderRow={(user:any, index:any) => (
    <TableRow key={index}>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.first_name}</TableCell>
      <TableCell>{user.last_name}</TableCell>
      <TableCell>{user.verified ? "Yes" : "No"}</TableCell>
    </TableRow>
  )}
  columns={["Email", "First Name", "Last Name", "Verified"]}
  searchPlaceholder="Search for a user"
/>
<SearchTable
  endpoint="moderator/businesses"
  renderRow={(business:any, index:any) => (
    <TableRow key={index}>
      <TableCell>{business.business_name}</TableCell>
      <TableCell>{business.business_description}</TableCell>
      <TableCell>{business.business_email}</TableCell>
      <TableCell>{business.verified ? "Verified" : "Not Verified"}</TableCell>
    </TableRow>
  )}
  columns={["Name", "Description", "Email", "Verified"]}
  searchPlaceholder="Search for a business"
/>
      </div>
    </div>
    );
}

export default requireMod(Moderator);
