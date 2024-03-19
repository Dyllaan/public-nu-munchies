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
            <form className="border-gray-500" onSubmit={handleSubmit}>
                <Label className="text-xl" htmlFor="title">Review Title</Label>
                <Input type="text" id="title" className="block mb-2 w-200" name="title" value={formData.title} onChange={handleChange} />
                <Label className="text-lg" htmlFor="rating">What would you rate this business?</Label>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a rating" />
                    </SelectTrigger>
                    <SelectContent id="rating" name="rating" value={formData.rating} onChange={handleChange}>
                        <SelectGroup>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Label htmlFor="review" className="block">Give us your opinion!</Label><br />
                <Textarea id="review" className="w-200" name="review_details" value={formData.review_details} onChange={handleChange}>{formData.review_details}</Textarea>

                <Button type="submit">submit your review</Button>
            </form>
        );
    }

    return (
        <>
            <Button onClick={handleClick}>Click to review this business!</Button>
            {showForm && reviewForm()}
        </>
    )
}

export default ReviewForm;

