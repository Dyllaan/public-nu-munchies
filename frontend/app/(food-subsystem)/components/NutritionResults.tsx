import React from 'react';
import { useLocation } from 'react-router-dom';
import "../css/food.css";
import { Input } from "@/components/ui/input";

interface NutritionData {
  name: string;
  weight: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  salt: number;
  quantity: number;
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const formData: NutritionData = {
    name: queryParams.get('name') || '',
    weight: parseFloat(queryParams.get('weight') || '0'),
    calories: parseFloat(queryParams.get('calories') || '0'),
    protein: parseFloat(queryParams.get('protein') || '0'),
    carbs: parseFloat(queryParams.get('carbs') || '0'),
    fat: parseFloat(queryParams.get('fat') || '0'),
    salt: parseFloat(queryParams.get('salt') || '0'),
    quantity: parseFloat(queryParams.get('quantity') || '0')
  };

  return (
    <div>
      <h2>Submitted Data</h2>
      <p>Name: {formData.name}</p>
      <p>Weight: {formData.weight}</p>
      <p>Calories: {formData.calories}</p>
      <p>Protein: {formData.protein}</p>
      <p>Carbohydrates: {formData.carbs}</p>
      <p>Fat: {formData.fat}</p>
      <p>Salt: {formData.salt}</p>
      <p>Quantity: {formData.quantity}</p>
    </div>
  );
};

export default ResultsPage;
