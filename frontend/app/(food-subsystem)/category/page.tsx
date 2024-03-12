'use client'

import React, { useState, useEffect } from 'react';
import * as api from '@/hooks/user-subsystem/api'

function Category() {
    const [category, setCategory] = useState<{ data: any[] }>({
        data: []
    });
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const fetchData = async () => {
        const res = await api.get("category", localStorage.getItem("token"));
        if(res.success)
        {
            setCatState(res.data.data.category);
            setLoading(false);
        } else {
            console.error("Failed to get user:", res.data.message);
            setLoading(false);
        }
        return res;
    };

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

function setCatState(category: any) {
    throw new Error('Function not implemented.');
}
function setLoading(arg0: boolean) {
    throw new Error('Function not implemented.');
}

