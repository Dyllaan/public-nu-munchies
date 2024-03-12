/* Checkout
Function to redirect use to the checkout page when they select it with the item of choice 
@author Cameron Bramley - w21020682
@Generated This function was made with the help of chatGPT
*/

function Checkout(props) {
    
//fetch the checkout url from the checkoutItem endpoint with the props.item.id as a parameter.
  const fetchData = async () => {
    const res = await fetch(`http://localhost:8080/checkoutItem?item_id=${props.item.id}`);
    return res.json();
  };

//when the button is clicked, run this function - check if the respone has data, then redirect the user to the checkout_url.
  const handleClick = () => {
    fetchData().then(res => {
      if (res && res.data) { 
        window.location.href = res.data.checkout_url;
        console.log("successssssss", res.data.checkout_url);
      } else {
        console.log("Checkout URL not found in response", res);
      }
    });
  };

//return the item details as well as a checkout button. When pressed, call handleClick
  return (
    <>
      <p className="font-bold">{props.item.item_name}</p>
      <p>Price: £{props.item.item_price}</p>
      <p>Expiry: {props.item.item_expiry}</p>
      <p>Collection Time: {props.item.collect_time}</p>
      <button onClick={handleClick}>checkout</button>
    </>
  );
}

export default Checkout;
