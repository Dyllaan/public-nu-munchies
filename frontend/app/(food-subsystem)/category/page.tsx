'use client'

import React, { useState, useEffect } from 'react';

function Category() {
    const [category, setCategory] = useState<{ data: any[] }>({
        data: []
    });
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const fetchData = async () => {
        const res = await fetch("http://localhost:8080/category");
        return res.json();
    }

    useEffect(() => {
        if (category.data.length > 0) return;

        fetchData().then(res => {
            setCategory(res);
        });
    }, [category]);

    const handleClick = (item: any) => {
        setSelectedCategory(item);
    }

    const categoryDisplay = (
        <div>
            <div>
                {category.data?.map((value: any, key: number) => (
                    <div key={key} className="mb-2" onClick={() => handleClick(value)}>
                        <p>Category: {value.cat_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            {categoryDisplay}
        </>
    )
}

export default Category;