"use client"

import React from 'react';
import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import {atom, useAtom} from "jotai";
import {useRouter} from 'next/navigation';
import {number, z} from "zod"; 
import * as api from "@/hooks/user-subsystem/use-user-subsystem";

import LoadingInPage from '@/app/(user-subsystem)/components/LoadingInPage';
import useFetchData from '@/hooks/user-subsystem/useFetchData';
import "../css/food.css";

function NutritionForm(props: any){
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    food_name: '',
    weight: 0,
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    salt: 0,
    quantity: 0
  })
  const handleClick = () => {
    setShowForm(!showForm);
  }
  const handleSubmit = async (event:any) => {
    event?.preventDefault();
    console.log("Submitted");
    console.log(formData);
  }
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.food_name]: e.target.value
    });
  };
    return (
      <form onSubmit={handleSubmit}>
          <label htmlFor="food_name">Food Name</label>
          <input type="text" id="food_name" name="food_name" value={formData.food_name} onChange={handleChange}/>

          <label htmlFor="weight">Weight:</label>
          <input type="number" id="weight" name="weight" value={formData.weight.toString()} onChange={handleChange} required />

          <label htmlFor="calories">Calories:</label>
          <input type="number" id="calories" name="calories" value={formData.calories.toString()} onChange={handleChange} required />
          
          <label htmlFor="protein">Protein (g):</label>
          <input type="number" id="protein" name="protein" value={formData.protein.toString()} onChange={handleChange} required />
          
          <label htmlFor="carbohydrates">Carbohydrates (g):</label>
          <input type="number" id="carbohydrates" name="carbohydrates" value={formData.carbs.toString()} onChange={handleChange} required />
          
          <label htmlFor="fat">Fat (g):</label>
          <input type="number" id="fat" name="fat" value={formData.fat.toString()} onChange={handleChange} required />

          <label htmlFor="salt">Salt:</label>
          <input type="number" id="salt" name="salt" value={formData.salt.toString()} onChange={handleChange} required />

          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" value={formData.quantity.toString()} onChange={handleChange} required />
          
          <button type="submit">Submit</button>
      </form>
    )
  }



export default NutritionForm;


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
