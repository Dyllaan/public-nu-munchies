"use client"
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Pencil2Icon } from '@radix-ui/react-icons';


function ReviewForm(props) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        business_id: props.business_id,
        title: '',
        rating: 1,
        review_details: ''
    })
    



    const handleClick = () => {
        setShowForm(!showForm);
    }

    const handleSubmit = async (event) => {
        event?.preventDefault();
        console.log("submitted");
        console.log(formData);
        try {
            const response = await fetch('http://localhost:8080/insertreview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },

                body: JSON.stringify(formData),
                credentials: 'omit'
            })
        } catch (error) {
            console.error('fetch operation failed!', error.message)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const reviewForm = () => {
        return (
            <div className='border rounded'>
            <form className="border-gray-500 m-2 text-md" onSubmit={handleSubmit}>
                <Label className="text-lg" htmlFor="title">Title</Label>
                <Input type="text" id="title" className="block mb-5 w-fill" name="title" value={formData.title} onChange={handleChange} />
                <Label htmlFor="rating">What would you rate this business?</Label><br />
            
                <select id="rating" className="mb-5"name="rating" value={formData.rating} onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <br />
                <Label htmlFor="review">Give us your opinion!</Label><br />
                <Textarea id="review" className="mb-5 w-fill" name="review_details" value={formData.review_details} onChange={handleChange}>{formData.review_details}</Textarea>

                <Button className="w-full bg-white border border-black text-black hover:bg-black hover:text-white" type="submit">Submit</Button>
            </form>
              </div>
        );
    }

    return (
        <>
            <div onClick={handleClick} className="flex">
                <p className="text-s">write a review</p>
                <Pencil2Icon />
            </div>
            {showForm && reviewForm()}
        </>
    )
}

export default ReviewForm;

