import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import useFetchData from '@/hooks/user-subsystem/useFetchData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingInPage from '../../reusable/LoadingInPage';
import { Button } from '@/components/ui/button';
import useModerator from '@/hooks/user-subsystem/use-moderator';
import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card";
import RemoveIP from './RemoveIP';
import useUserSubsystem from '@/hooks/user-subsystem/use-user-subsystem';

/**
 * 
 * Show all the countries from the affiliation table, allows for searching of countries by name
 * @author Louis Figes
 * @generated GitHub Copilot was used in the creation of this code.
 * 
 */

export default function DesktopManageIP({filteredData, loading, handleRemoval} : {filteredData:any, loading:any; handleRemoval:any;})  {
    const { requestLoading } = useUserSubsystem();
    const endOfData = (!loading && filteredData.length === 0);

    if(requestLoading) {
        return <LoadingInPage />;
    }

    function renderItems(data:any) {
        return data.map((ip:any, index:any) => (
        <TableRow key={index}>
            <TableCell className="text-left">{ip.ip_address}</TableCell>
            <TableCell>
            {new Date(ip.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
                <RemoveIP ip={ip.ip_address} handleRemoval={handleRemoval}/>
            </TableCell>
        </TableRow>
        ));
    }
  
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                <TableHead className="">IP</TableHead>
                <TableHead className="">Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {endOfData && <TableRow><TableCell colSpan={3} className="text-center">No IP Addresses Found!</TableCell></TableRow>}
                {renderItems(filteredData)}
            </TableBody>
        </Table>
    );
}