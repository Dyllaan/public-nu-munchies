"use client";
import React from 'react';
import requireMod from '../components/moderator/requireMod';
import SearchUsers from '../components/moderator/SearchUsers';
import SearchBusiness from '../components/moderator/SearchBusiness';
import { Card, CardHeader } from '@/components/ui/card';
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
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
        <SearchUsers />
        <SearchBusiness />
      </div>
    </div>
    );
}

export default requireMod(Moderator);
