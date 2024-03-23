"use client"
/* Display reviews
component to display all of the reviews relevant to the selected business. 
@author Cameron Bramley - w21020682
@generated This function was made with the help of chatGPT
*/
import { useState, useEffect } from 'react';
import { StarIcon } from '@radix-ui/react-icons';

interface Review {
  title?: string,
  rating?: number,
  review_details?: string,
  first_name?: string,
  last_name?: string
  id?: number
}

function DisplayReviews(props: any) {
  const [reviews, setReviews] = useState<{ data: { id: Review[] } }>({
    data: { id: [] }
  });

  //fetch reviews with business_id as parameter...
  const fetchData = async () => {
    const res = await fetch(`https://backend.nu-munchies.xyz/getreviews?business_id=${props.business_id}`);
    return res.json()
  }

  useEffect(() => {
    fetchData().then(res => {
      setReviews(res);
    });
  },);

  //return and display all reviews.
  return (
    <>
      <div className="grid-cols-{4}">
        <div className="my-2">
          {reviews.data.id?.map((value: any, key: any) => (
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

