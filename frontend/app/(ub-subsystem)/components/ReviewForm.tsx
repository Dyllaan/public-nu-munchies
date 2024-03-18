"use client"
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"

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
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Review Title</label>
                <input type="text" id="title" className="block mb-2 bg-red-200 border-gray-900" name="title" value={formData.title} onChange={handleChange} />
                <label htmlFor="rating">What would you rate this business?</label>
                <select id="rating" className=" mb-2 border-gray-900" name="rating" value={formData.rating} onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <label htmlFor="review" className="block border-[#000000]">Give us your opinion!</label><br />
                <textarea id="review" name="review_details" value={formData.review_details} onChange={handleChange}>{formData.review_details}</textarea>

                <button type="submit" className="block mb-2 bg-red-200">submit your review</button>
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

