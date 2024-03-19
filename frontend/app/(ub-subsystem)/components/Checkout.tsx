'use client'
/* Checkout
Function to redirect use to the checkout page when they select it with the item of choice 
@author Cameron Bramley - w21020682
@Generated This function was made with the help of chatGPT
*/
import { selectedItemAtom } from './Items';
import { useAtom } from "jotai";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReviewForm from './ReviewForm'
import DisplayReviews from './DisplayReviews'
import { Button } from "@/components/ui/button"
import Nutritions from '@/app/(food-subsystem)/components/NutritionDisplay';
import { SelectItem } from '@radix-ui/react-select';
import { ClockIcon } from '@radix-ui/react-icons';
import { StarIcon } from '@radix-ui/react-icons';
import useUserSubsystem from '@/hooks/user-subsystem/use-user-subsystem';
import RedirectTo from '@/app/(user-subsystem)/components/RedirectTo';
import Link from 'next/link';


function Checkout() {
  //fetch the checkout url from the checkoutItem endpoint with the props.id as a parameter.
  const [selectedItem] = useAtom(selectedItemAtom);
  const router = useRouter();
  const fetchData = async () => {
    const res = await fetch(`http://localhost:8080/checkoutItem?item_id=${selectedItem.id}`);
    return res.json();
  };
  const today = new Date();
  const todaysDate = String(today.getDate());

  const {user, logged} = useUserSubsystem()
    if(!logged){
        return(
            <Link href="/login">Please login before writing a review!</Link>
        )
    }


  useEffect(() => { if (selectedItem.id == undefined) { router.replace("/") } })


  //when the button is clicked, run this function - check if the respone has data, then redirect the user to the checkout_url.
  const handleClick = () => {
    fetchData().then(res => {
      if (res && res.data) {
        window.location.href = res.data.checkout_url;
      } else {
        console.log("Checkout URL not found in response", res);
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
      

      <div className="flex space-x-2">
        <p>{selectedItem.address_line1} <span className="text-black">|</span></p>
        <p className="text-gray-500">{selectedItem.address_city} <span className="text-black">|</span></p>
        <p className="text-gray-500">{selectedItem.address_postcode}</p>
      </div>

      <p>{selectedItem.item_expiry}</p>
      <div className="flex relative items-center">
        <ClockIcon />
        {selectedItem.collect_date !== todaysDate ? (
          <>
            <p className="ml-1">{selectedItem.collect_time} (tomorrow)</p>
          </>
        ) : (
          <>
            <p className="ml-1">{selectedItem.collect_time}</p>
          </>
        )}
      </div>


      <Button onClick={handleClick}>Checkout (£{selectedItem.item_price})</Button>
      <br></br>
      <h2 className="font-bold text-xl">Reviews</h2>
      <ReviewForm className="mt-2" business_id={selectedItem.business_id} />
      <DisplayReviews business_id={selectedItem.business_id} />
      <Nutritions item_id={selectedItem.id} />
    </>
  );
}

export default Checkout;
