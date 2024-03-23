"use client"
/* ReviewForm
component that expands when the button is clicked to reveal a review form. 
@author Cameron Bramley - w21020682
@generated This function was made with the help of chatGPT
*/
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Pencil2Icon } from '@radix-ui/react-icons';


function ReviewForm(props: any) {
    //constant used to decide whether or no to display the form
    const [showForm, setShowForm] = useState(false);

    //@generated - chatGPT was used to define the expected elements (e.g. business_id, title)
    const [formData, setFormData] = useState({
        business_id: props.business_id,
        title: '',
        rating: 1,
        review_details: ''
    });

    //change value of show form to expand / retract form.
    const handleClick = () => {
        setShowForm(!showForm);
    }
    /* @generated This code was written with help of chatGPT, namely to help with removing code errors in the error handling segment.
    This code inserts the review written by the user into the reviews table by making a post request to /insertreview endpoint. 
    For this request, the users jwt token is sent to verify who the review is written by.
     */
    const handleSubmit = async (event: any) => {
        event?.preventDefault();
        try {
            const response = await fetch('https://backend.nu-munchies.xyz/insertreview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },

                body: JSON.stringify(formData),
                credentials: 'omit'
            })
                .then(response => {
                    if (response.ok) {
                        setShowForm(false);
                    }
                    else {
                        console.error("invalid form values!");
                    }
                })
        } catch (error) {
            if (error instanceof Error) {
                console.error('fetch operation failed!', error.message);
            } else {

                console.error('An unexpected error occurred:', String(error));
            }
        }
    }
    //@generated - written by chatGPT
    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    //return the review form if the 'write a review' button was pressed.
    const reviewForm = () => {
        return (
            <div className='border rounded'>
                <form className="border-gray-500 m-2 text-md" onSubmit={handleSubmit}>
                    <Label className="text-lg" htmlFor="title">Title</Label>
                    <Input type="text" id="title" className="block mb-5 w-fill" placeholder="type here..." name="title" value={formData.title} onChange={handleChange} />
                    <Label htmlFor="rating">What would you rate this business?</Label><br />
                    <select id="rating" className="mb-5" name="rating" value={formData.rating} onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br />
                    <Label htmlFor="review">Give us your opinion!</Label><br />
                    <Textarea id="review" placeholder="type here..." className="mb-5 w-fill" name="review_details" value={formData.review_details} onChange={handleChange}>{formData.review_details}</Textarea>
                    <Button className="w-full bg-white border border-black text-black hover:bg-black hover:text-white" type="submit">Submit</Button>
                </form>
            </div>
        );
    }
//return the form button. if clicked, run handleclick function
    return (
        <>
            <div onClick={handleClick} className="flex">
                <p className="text-s">write a review...</p>
                <Pencil2Icon />
            </div>
            {showForm && reviewForm()}
        </>
    )
}

export default ReviewForm;

