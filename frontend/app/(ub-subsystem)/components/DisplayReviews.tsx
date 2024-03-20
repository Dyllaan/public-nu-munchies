"use client"
import { useState, useEffect } from 'react';
import { StarIcon } from '@radix-ui/react-icons';

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
        <div className="my-2">
          {reviews.data.id?.map((value:any, key:any) => (
            <div key={key} className="border rounded my-2">
            
              
              <div className="flex relative  items-center">
              
              <p className="font-bold text-lg pr-2">{value.title}</p>
              <StarIcon color="red" />
                <p>{value.rating}/5</p>  
              </div>
              <p>{value.first_name} {value.last_name}</p>
              <p>{value.review_details}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default DisplayReviews;

