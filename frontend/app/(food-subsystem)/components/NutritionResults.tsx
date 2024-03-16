"use client"

import React from 'react';
import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import "../css/food.css";
import { Input } from "@/components/ui/input";
import {useRouter} from 'next/navigation';
import useFetchData from '@/hooks/user-subsystem/useFetchData';

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
