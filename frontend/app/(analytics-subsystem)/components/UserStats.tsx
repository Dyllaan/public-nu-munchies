'use client'
/*
Items

@author Jake McCarthy (w20043974) 
*/
import { useState, useEffect } from 'react'

function UserStats() {
const [items, setItems] = useState([]);
 
    const fetchData = () => { 
        fetch("http://localhost:8080/analytics/user-stats")
        .then( response => response.json() )
        .then( json => setItems(json) )
        .then( json => console.log(json) )
        .catch(error => {
          console.error('Error fetching data:', error); 
    });}

    
 
    useEffect( fetchData, [])
    const statsDisplay = (
      <div className="bg-[#eaeaea] my-2 rounded">
        {Array.isArray(items) && items.map((value, key) => (
          <div key={key} className="mb-2">
            <p className="font-bold">Welcome, {value.userFirstName}</p>
            <p>Total Food Waste Prevented: {value.preventedWaste} kg</p>
          </div>
        ))}
      </div>
    );

    return (
        <>
        {statsDisplay}
        </>
    )
}
 
export default UserStats