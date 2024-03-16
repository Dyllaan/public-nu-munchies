"use client"

import {useState, useEffect} from 'react';
import {atom, useAtom} from "jotai";
import {useRouter} from 'next/navigation';

interface Category{
    cat_id?: number
    cat_name?: string
}

function Categories(){
    const router = useRouter();
    const [categories, setCategories] = useState<{ data: Category[]}> ({
        data: []
    });
    const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

    const fetchData = async() => {
        const res = await fetch("http://localhost:8080/getcategory")
        return res.json()
    }

    useEffect(() => {
        if(categories.data.length > 0) return;
        fetchData().then(res => {
            setCategories(res);
            console.log(res);
        });
    }, []);

    const handleClick = (category: Category) => {
        console.log(category);
        setSelectedCategory(category);
    }
    return (
        <>
            <div className="grid-cols-{4}">
                <div className="bg-[#eaeaea] my-2 rounded">
                    {categories.data?.map((value, key) =>(
                        <div key={key} className="mb-2" onClick={() => handleClick(value)}>
                            <p className="font-bold">{value.cat_name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export const selectedCategoryAtom = atom<Category>({cat_id: undefined, cat_name: undefined});
export default Categories;