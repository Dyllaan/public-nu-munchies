"use client"

import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { Input } from "@/components/ui/input";
import "../css/NutritionForm.css";





const NutritionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    item_id: '',
    weight: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    salt: '',
    quantity: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Validate if the value is numeric, and if not, set it to an empty string
    const newValue = isNaN(Number(value)) ? '' : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend endpoint
      const response = await axios.post('http://localhost:8080/addnutrition', formData);
      console.log('Response:', response.data);
      // Reset the form after successful submission
      setFormData({
        item_id: '',
        weight: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        salt: '',
        quantity: '',
      });
      // Handle any other logic after successful submission
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <form onSubmit={handleSubmit} >
          <h2>Nutrition Form</h2>
          <div className="field-holder text-center">
            <label>Item ID:</label>
            <input type="number" placeholder="Item ID" name="item_id" value={formData.item_id} onChange={handleChange} />
          </div>
          <div className="field-holder text-center">
            <label>Weight:</label>
            <input type="number" placeholder="0" name="weight" value={formData.weight} onChange={handleChange} />
          </div>
          <div className="field-holder text-center">
            <label>Calories:</label>
            <input type="number" placeholder="0" name="calories" value={formData.calories} onChange={handleChange} />
          </div>
          <div className="field-holder text-center">
            <label>Protein:</label>
            <input type="number" placeholder="0" name="protein" value={formData.protein} onChange={handleChange} />
          </div>
          <div className="field-holder text-center">
            <label>Carbs:</label>
            <input type="number" placeholder="0" name="carbs" value={formData.carbs} onChange={handleChange} />
          </div>
          <div className="field-holder text-center">
            <label>Fat:</label>
            <input type="number" placeholder="0" name="fat" value={formData.fat} onChange={handleChange} />
          </div>
          <div className="field-holder text-center">
            <label>Salt:</label>
            <input type="number" placeholder="0" name="salt" value={formData.salt} onChange={handleChange} />
          </div>
          <div className="field-holder text-center">
            <label>Quantity:</label>
            <input type="number"placeholder="0" name="quantity" value={formData.quantity} onChange={handleChange} />
          </div>
          <button type="submit">Save Nutrition</button>
        </form>
      </div>
    </section>
  );
};

export default NutritionForm;
