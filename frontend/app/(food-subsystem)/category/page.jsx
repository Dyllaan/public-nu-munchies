"use client";
import React, { useState, useEffect } from 'react';

function Main() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://localhost:8080/category");
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const json = await response.json();
                setCategories(json);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {categories.map((value, key) => (
                <div key={key} className="bg-[#eaeaea] my-2 rounded">
                    <p className="font-bold">Name: {value.cat_name}</p>
                </div>
            ))}
        </div>
    );
}

export default Main;