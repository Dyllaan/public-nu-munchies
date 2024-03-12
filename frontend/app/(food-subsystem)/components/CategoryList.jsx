'use client'

import {useState, useEffect} from 'react'

function CategoryList()
{
    const[category, setCategory] = useState([]);
        const fetchData = () => { 
            fetch("http://localhost:3000/category")
            .then( response => response.json() )
            .then( json => setItems(json) )
            .catch(error => {
            console.error('Error fetching data:', error); 
        });}
        useEffect( fetchData, [])
        const catDisplay = (
            <div className="bg-[#eaeaea] my-2 rounded">
                {category.map((value, key) => (
                <div key={key} className="mb-2">
                    <p className="font-bold">{value.cat_name}</p>
                </div>
                ))}
            </div>
        );
        return (
            <>
                {catDisplay}
            </>
        )
}
export default CategoryList