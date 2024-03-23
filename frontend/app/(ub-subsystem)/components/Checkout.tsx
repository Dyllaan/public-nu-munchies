'use client'
/* Checkout
component to redirect use to the checkout page when they select it with the item of choice 
@author Cameron Bramley - w21020682
@generated This function was made with the help of chatGPT
*/
import { selectedItemAtom } from './Items';
import { useAtom } from "jotai";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReviewForm from './ReviewForm';
import DisplayReviews from './DisplayReviews'
import { Button } from "@/components/ui/button"
import { ClockIcon } from '@radix-ui/react-icons';
import { StarIcon } from '@radix-ui/react-icons';
import useUserSubsystem from '@/hooks/user-subsystem/use-user-subsystem';
import Link from 'next/link';


function Checkout() {
  //setting constant - selectedItemAtom was imported from the Items.tsx component. 
  const [selectedItem] = useAtom(selectedItemAtom);
  const router = useRouter();
  const { user, logged } = useUserSubsystem();
  //These constants are used to check whether the collection date is today or if it is tomorrow. 
  const today = new Date();
  const todaysDate = String(today.getDate());
  /* 
  Take the selectedItems id and make a request to the checkoutItem Endpoint.
  @generated - this code was written with the help of chatGPT, particularly resolving code errors regarding error handling
   */
  const fetchData = async () => {
    try {
      const res = await fetch(`https://backend.nu-munchies.xyz/checkoutItem?item_id=${selectedItem.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'omit'
      })
      return res.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('fetch operation failed!', error.message);
      } else {

        console.error('An unexpected error occurred:', String(error));
      }
    }

  }

  //redirect user back to main page if there is no defined selected item. If the user is not logged, prompt them to login.
  useEffect(() => {
    if (selectedItem.id === undefined) {
      router.replace("/");
    }
  }, [selectedItem.id, router]);

  if (!logged) {
    return (
      <Link className="underline" href="/login">Click here to login before proceeding to checkout!</Link>
    );
  }


  //when the button is clicked, run this function - check if the respone has data, then redirect the user to the checkout_url.
  const handleClick = () => {
    fetchData().then(res => {
      if (res && res.data) {
        window.location.href = res.data.checkout_url;
      } else {
        console.error("Checkout URL not found in response", res);
      }
    });
  };

  //return the item details as well as a checkout button. When pressed, call handleClick
  return (
    <>

      <h1 className="font-bold text-3xl text-red-500">{selectedItem.item_name}</h1>

      <div className="flex relative items-center">
        <p >{selectedItem.business_name}</p>
        <StarIcon color='red' className="ml-1" />
        <p className="mr-2">{selectedItem.average_rating}</p>
      </div>

      <div className="flex space-x-2 sm:flex-row sm:flex-wrap sm:space-x-2">
        <p>{selectedItem.address_line1} <span className="text-black">|</span></p>
        <p className="text-gray-500">{selectedItem.address_city} <span className="text-black">|</span></p>
        <p className="text-gray-500">{selectedItem.address_postcode}</p>
      </div>

      <p>{selectedItem.business_description}</p>

      <p>{selectedItem.item_expiry}</p>

      <div className="flex relative items-center mb-2">
        <ClockIcon />
        {selectedItem.collect_date !== todaysDate ? (
          <>
            <p className="ml-1">Collection: {selectedItem.collect_time} (tomorrow)</p>
          </>
        ) : (
          <>
            <p className="ml-1">Collection: {selectedItem.collect_time}</p>
          </>
        )}
      </div>

      <div>
        <h3 className="font-semibold">Nutrition</h3>
        <p> Weight - {selectedItem.weight}g</p>
        <p>Calories - {selectedItem.calories}cal</p>
        <p>Protein - {selectedItem.protein}g</p>
        <p>Fat - {selectedItem.fat}g</p>
        <p>Salt - {selectedItem.salt}g</p>
        <p>Item Quantity - {selectedItem.quantity}</p>
      </div>

      <Button onClick={handleClick} className="mb-5 mt-5 sm:w-full">Checkout (£{selectedItem.item_price})</Button>

      <br></br>
      <h2 className="font-semibold text-xl">Reviews</h2>
      <p>See what people think about {selectedItem.business_name}...</p>
      <ReviewForm className="mt-2" business_id={selectedItem.business_id} />
      <DisplayReviews business_id={selectedItem.business_id} />
    </>
  );
}
export default Checkout
