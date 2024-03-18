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


function Checkout() {
  //fetch the checkout url from the checkoutItem endpoint with the props.id as a parameter.
  const [selectedItem] = useAtom(selectedItemAtom);
  const router = useRouter();
  const fetchData = async () => {
    const res = await fetch(`http://localhost:8080/checkoutItem?item_id=${selectedItem.id}`);
    return res.json();
  };


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
      <ReviewForm business_id={selectedItem.business_id} />
      <p className="font-bold">{selectedItem.item_name}</p>
      <p>Price: £{selectedItem.item_price}</p>
      <p>Expiry: {selectedItem.item_expiry}</p>
      <p>Collection Time: {selectedItem.collect_time}</p>
      <Button onClick={handleClick}>checkout</Button>

      <DisplayReviews business_id={selectedItem.business_id} />
    </>
  );
}

export default Checkout;
