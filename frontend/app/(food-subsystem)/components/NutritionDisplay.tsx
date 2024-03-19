import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingInPage from '@/app/(user-subsystem)/components/LoadingInPage';
import useFetchData from '@/hooks/user-subsystem/useFetchData';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
function Nutritions({item_id}:{item_id:any}){
    const router = useRouter();    
    const { data, loading } = useFetchData(`getnutrition?item_id=${item_id}`);
    if (loading) {
        return <LoadingInPage />;
    }
    function renderItems(data:any) {
        return data.map((value:any, key:any) => 
            <TableRow key={key}>
                <TableCell>{value.item_name}</TableCell>
                <TableCell>{value.weight}</TableCell>
                <TableCell>{value.calories}</TableCell>
                <TableCell>{value.protein}</TableCell>
                <TableCell>{value.carbs}</TableCell>
                <TableCell>{value.fat}</TableCell>
                <TableCell>{value.salt}</TableCell>
                <TableCell>{value.quantity}</TableCell>
            </TableRow>
        )
    }
    return (
        <div>
            <h2>Nutrition Details</h2>
            <Table>
                <TableHeader>
                    <tr>
                        <TableHead >Item Name</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Calories</TableHead>
                        <TableHead>Protein</TableHead>
                        <TableHead>Carbs</TableHead>
                        <TableHead>Fat</TableHead>
                        <TableHead>Salt</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                    </tr>
                </TableHeader>
                <TableBody>
                    {data && data.length > 0 && renderItems(data)}
                </TableBody>
            </Table>
        </div>
    )
}
export default Nutritions;