'use client'

import React from 'react';
import { useLocation } from 'react-router-dom';

interface NutritionData {
  foodName: string;
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
  const formData: NutritionData = location.state ? (location.state as any).data : null;

  return (
    <div>
      <h2>Results</h2>
      {formData && (
        <div>
          <p>Food Name: {formData.foodName}</p>
          <p>Weight: {formData.weight}g</p>
          <p>Calories: {formData.calories}</p>
          <p>Protein: {formData.protein}g</p>
          <p>Carbohydrates: {formData.carbs}g</p>
          <p>Fat: {formData.fat}g</p>
          <p>Salt: {formData.salt}g</p>
          <p>Quantity: {formData.quantity}</p>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
