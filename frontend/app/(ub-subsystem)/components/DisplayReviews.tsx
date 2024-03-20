"use client"
import { useState, useEffect } from 'react';

interface Review {
    title?: string,
    rating?: number,
    review_details?: string,
    first_name?: string,
    last_name?: string
}

function DisplayReviews(props:any) {
    const [reviews, setReviews] = useState<{ data: Review[] }>({
    data: []
  });


    const fetchData = async () => {
    const res = await fetch(`http://localhost:8080/getreviews?business_id=${props.business_id}`);
    return res.json()
  }

  useEffect(() => {
    fetchData().then(res => {
      setReviews(res);
      console.log(res);
      console.log(res.data);

    });
  }, []);

    return (
        <>
            <div className="grid-cols-{4}">
                <div className="bg-[#eaeaea] my-2 rounded">
                    {reviews.data.id?.map((value, key) => (
                        <div key={key} className="mb-2">
                            <p className="font-bold">{value.title}</p>
                            <p>rating: £{value.rating}</p>
                            <p>details: {value.review_details}</p>
                            <p>by: {value.first_name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DisplayReviews;

