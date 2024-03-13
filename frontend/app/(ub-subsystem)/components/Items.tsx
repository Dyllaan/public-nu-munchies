'use client'
/*
Items

@author Cameron Bramley (w21020682) 
*/
import { useState, useEffect } from 'react'

function Items() {
const [items, setItems] = useState([]);
 
    const fetchData = () => { 
        fetch("http://localhost:8080/getItems")
        .then( response => response.json() )
        .then( json => setItems(json) )
        .catch(error => {
          console.error('Error fetching data:', error); 
    });}

    
 
    useEffect( fetchData, [])
    const itemsDisplay = (
      <div className="bg-[#eaeaea] my-2 rounded">
        {items.map((value, key) => (
          <div key={key} className="mb-2">
            <p className="font-bold">{value.item_name}</p>
            <p>Price: £{value.item_price}</p>
            <p>Expiry: {value.item_expiry}</p>
            <p>Collection Time: {value.collect_time}</p>
          </div>
        ))}
      </div>
    );

    return (
        <>
        {itemsDisplay}
        </>
    )
}
 
export default Items
