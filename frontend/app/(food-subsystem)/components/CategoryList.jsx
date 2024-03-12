'use client'

import {useState, useEffect} from 'react'

function CategoryList()
{

    useEffect(() => {
        const fetchData = async () => {
            try {
                let { data: categoryData, error } = await supabase.from('categories').select('*');
                if (error) {
                    throw error;
                }
                setCategory(categoryData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const catDisplay = (
        <div>
            {category.map((value, key) => (
                <div key={key} className="mb-2">
                    <p className="font-bold">{value.cat_name}</p>
                </div>
            ))}
        </div>
    );

    return <>{catDisplay}</>;
}

export default CategoryList;