'use client'

import {useState, useEffect} from 'react'

function Cat() 
{
    const [categories, setCat] = useState([]);
        const fetchData = () => {
            fetch("https://localhost:8080/category")
            .then (response => response.json())
            .then (json =>setCat(json))
            .catch (error => {
                console.error('Error fetching data: ', error);
            }); 
        }
    useEffect(fetchData, [])
    const CatDisplay = (
        <div className="bg-[#eaeaea] my-2 rounded">
            {categories.map((value, key) => (
                <div key={key} className="mb-2">
                    <p className="font-bold">Name: {value.cat_name}</p>
                </div>
            ))}
        </div>
    );
    return (
        <>
            {CatDisplay}
        </>
    )
}
export default Cat