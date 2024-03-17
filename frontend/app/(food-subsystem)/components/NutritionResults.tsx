"use client"

import React from 'react';
import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom'
import { Input } from "@/components/ui/input";
import {atom, useAtom} from "jotai";
import {useRouter} from 'next/navigation';
import {number, z} from "zod"; 

import LoadingInPage from '@/app/(user-subsystem)/components/LoadingInPage';
import useFetchData from '@/hooks/user-subsystem/useFetchData';
import "../css/food.css";

interface Nutrition{
  food_id?: number
  food_name?: string
  weight?: number
  calories?: number
  protein?: number
  carbs?: number
  fat?: number
  salt?: number
  quantity?: number
}

function Nutritions(){
  const router = useRouter();
  const [nutritions, setNutritions] = useState<{data: Nutrition[]}> ({
    data: []
  });
  const [selectedNutrition, setSelectedNutrition] = useAtom(selectedNutritionAtom);
  
  const {data, loading} = useFetchData("addnutrition");

  const handleClick = (nutrition: Nutrition) => {
    console.log(nutrition);
    setSelectedNutrition(nutrition);
  }
  if(loading){
    return <LoadingInPage />
  }
  return (
    <>
      <div>
      {data.map((value: any, key) => (
        <div key={key} >
          <h2>Submitted Data</h2>
          <p>Name: {value.food_name}</p>
          <p>Weight: {value.weight}</p>
          <p>Calories: {value.calories}</p>
          <p>Protein: {value.protein}</p>
          <p>Carbohydrates: {value.carbs}</p>
          <p>Fat: {value.fat}</p>
          <p>Salt: {value.salt}</p>
          <p>Quantity: {value.quantity}</p>
        </div>
      ))}
      
    </div>
    </>
  )
}
export const selectedNutritionAtom = atom<Nutrition>({food_id: undefined, food_name: undefined, weight: undefined, calories:undefined, protein: undefined, carbs: undefined, fat: undefined, salt:undefined, quantity: undefined});
export default Nutritions;


/*
interface NutritionData {
  food_name: string;
  weight: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  salt: number;
  quantity: number;
}
function NutritionTable(){
  const router = useRouter();
  const [nutrition, setNutrition] = useState<{data: Nutrition[]} ({
    data: []
  });
  const {data, loading} = useFetchData ("addnutrition");

  const ResultsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const handleClick = (nutrition: Nutrition) => {
    console.log(category);
    setSelectedCategory(category);
}

  return (
    <><div>
      {data.map((value, key) => (
        <div key={key} >
          <h2>Submitted Data</h2>
          <p>Name: {value.food_name}</p>
          <p>Weight: {value.weight}</p>
          <p>Calories: {value.calories}</p>
          <p>Protein: {value.protein}</p>
          <p>Carbohydrates: {value.carbs}</p>
          <p>Fat: {value.fat}</p>
          <p>Salt: {value.salt}</p>
          <p>Quantity: {value.quantity}</p>
        </div>
      ))}
      
    </div></>
    
  )
};
}



export default NutritionTable;
*/
