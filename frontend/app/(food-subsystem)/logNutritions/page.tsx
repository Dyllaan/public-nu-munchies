"use client"

import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Label} from "@/components/ui/label";

import "../css/NutritionForm.css";
import { IoIosNutrition } from "react-icons/io";

import Header from "@/app/layout-components/Header";
import AgreementFooterNutrition from '../components/AgreementFooterNutrition';

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
    <>
      <Header />
        <section className="hero">
          <div className="container flex flex-col">
            <form className="items-center justify-center mx-auto" onSubmit={handleSubmit}>
              <h2>Nutrition Form</h2>
              <div className="field-holder text-center">
                <Label>Item ID:</Label>
                <Input className="w-full" type="number" placeholder="Item ID" name="item_id" value={formData.item_id} onChange={handleChange} />
              </div>
              <div className="field-holder text-center">
                <Label>Weight:</Label>
                <Input type="number" placeholder="0" name="weight" value={formData.weight} onChange={handleChange} />
              </div>
              <div className="field-holder text-center">
                <Label>Calories:</Label>
                <Input type="number" placeholder="0" name="calories" value={formData.calories} onChange={handleChange} />
              </div>
              <div className="field-holder text-center">
                <Label>Protein:</Label>
                <Input type="number" placeholder="0" name="protein" value={formData.protein} onChange={handleChange} />
              </div>
              <div className="field-holder text-center">
                <Label>Carbs:</Label>
                <Input type="number" placeholder="0" name="carbs" value={formData.carbs} onChange={handleChange} />
              </div>
              <div className="field-holder text-center">
                <Label>Fat:</Label>
                <Input type="number" placeholder="0" name="fat" value={formData.fat} onChange={handleChange} />
              </div>
              <div className="field-holder text-center">
                <Label>Salt:</Label>
                <Input type="number" placeholder="0" name="salt" value={formData.salt} onChange={handleChange} />
              </div>
              <div className="field-holder text-center">
                <Label>Quantity:</Label>
                <Input type="number" placeholder="0" name="quantity" value={formData.quantity} onChange={handleChange} />
              </div>
              <Button type="submit">
                Save Nutrition
              </Button>
            </form>

            <a href="http://localhost:3000/displayNutrition" className="text-center pt-5 underline">View All Nutritions</a>
          </div>
        </section>
        <AgreementFooterNutrition referrer="login" />
    </>
  );
};

export default NutritionForm;
