"use client"

import {useState, useEffect} from 'react';
import {atom, useAtom} from "jotai";
import {useRouter} from 'next/navigation';
import useFetchData from '@/hooks/user-subsystem/useFetchData';
import LoadingInPage from '@/app/(user-subsystem)/components/LoadingInPage';

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

    const {data, loading} = useFetchData("getcategory");


    const handleClick = (category: Category) => {
        console.log(category);
        setSelectedCategory(category);
    }

    if(loading){
        return <LoadingInPage />
    }

    return (
        <>
            <div className="grid-cols-{4}">
                <div className="bg-[#eaeaea] my-2 rounded">
                    {data.map((value: any, key) =>(
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