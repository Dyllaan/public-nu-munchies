
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { atom, useAtom } from "jotai";
import { useRouter } from 'next/navigation';
import LoadingInPage from '@/app/(user-subsystem)/components/LoadingInPage';
import useFetchData from '@/hooks/user-subsystem/useFetchData';
import { useRoute } from '@react-navigation/native';

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
    

    const { data, loading } = useFetchData("getnutrition");




    const handleClick = (nutrition: NutritionItem) => {
        setSelectedNutrition(nutrition);
    }


    if (loading) {
        return <LoadingInPage />;
    }

    return (
        <div>
            <h2>Nutrition Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Weight</th>
                        <th>Calories</th>
                        <th>Protein</th>
                        <th>Carbs</th>
                        <th>Fat</th>
                        <th>Salt</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value:any,  key: number) => (
                        <tr key= {key} onClick={() => handleClick(value)}>
                            <td>{value.item_name}</td>
                            <td>{value.weight}</td>
                            <td>{value.calories}</td>
                            <td>{value.protein}</td>
                            <td>{value.carbs}</td>
                            <td>{value.fat}</td>
                            <td>{value.salt}</td>
                            <td>{value.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}



export const selectedNutritionAtom = atom<NutritionItem>({food_id: undefined, item_name: undefined, weight: undefined, calories: undefined, protein: undefined, carbs: undefined, fat: undefined, salt: undefined, quantity: undefined });
export default Nutritions;
