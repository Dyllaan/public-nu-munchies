
import React from 'react';
import { atom, useAtom } from "jotai";
import { useRouter } from 'next/navigation';
import LoadingInPage from '@/app/(user-subsystem)/components/LoadingInPage';
import useFetchData from '@/hooks/user-subsystem/useFetchData';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";


interface NutritionItem {
  food_id?: number;
  item_name?: string;
  weight?: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  salt?: number;
  quantity?: number;
}


function Nutritions(){
    const router = useRouter();
    const [selectedNutrition, setSelectedNutrition] = useAtom(selectedNutritionAtom);
    

    const { data, loading } = useFetchData("allnutrition?item_id=4");




    const handleClick = (nutrition: NutritionItem) => {
        setSelectedNutrition(nutrition);
    }


    if (loading) {
        return <LoadingInPage />;
    }

    return (
        <div className="container bg-stone-200 rounded-2xl">
            <h1 className="text-center p-6">All Food Nutrition Details</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-black"><h2>Item Name</h2></TableHead>
                        <TableHead className="text-black"><h2>Weight</h2></TableHead>
                        <TableHead className="text-black"><h2>Calories</h2></TableHead>
                        <TableHead className="text-black"><h2>Protein</h2></TableHead>
                        <TableHead className="text-black"><h2>Carbs</h2></TableHead>
                        <TableHead className="text-black"><h2>Fat</h2></TableHead>
                        <TableHead className="text-black"><h2>Salt</h2></TableHead>
                        <TableHead className="text-black"><h2>Quantity</h2></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((value:any,  key) => (
                        <TableRow key= {key} onClick={() => handleClick(value)}>
                            <TableCell>{value.item_name}</TableCell>
                            <TableCell>{value.weight}</TableCell>
                            <TableCell>{value.calories}</TableCell>
                            <TableCell>{value.protein}</TableCell>
                            <TableCell>{value.carbs}</TableCell>
                            <TableCell>{value.fat}</TableCell>
                            <TableCell>{value.salt}</TableCell>
                            <TableCell>{value.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}



export const selectedNutritionAtom = atom<NutritionItem>({food_id: undefined, item_name: undefined, weight: undefined, calories: undefined, protein: undefined, carbs: undefined, fat: undefined, salt: undefined, quantity: undefined });
export default Nutritions;
