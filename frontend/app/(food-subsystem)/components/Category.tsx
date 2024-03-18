import { useState } from 'react';
import { atom, useAtom } from "jotai";
import { useRouter } from 'next/navigation';
import useFetchData from '@/hooks/user-subsystem/useFetchData';
import LoadingInPage from '@/app/(user-subsystem)/components/LoadingInPage';

import "../css/Category.css";

interface Category {
    cat_id?: number;
    cat_name?: string;
}

function Categories() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
    const [showCategories, setShowCategories] = useState(false);

    const { data, loading } = useFetchData("getcategory");

    const handleClick = (category: Category) => {
        setSelectedCategory(category);
    }
    const handleTitleClick = () => {
        setShowCategories(!showCategories);
    }

    if (loading) {
        return <LoadingInPage />
    }

    return (
        <section className="hero">
            <h1 className="title" onClick={handleTitleClick}>Categories</h1>
            {showCategories && (
                <div className="grid grid-cols-3 gap-20">
                {data.map((value: any, key) => (
                    <div key={key} className="bg-gray-200 p-4 rounded cursor-pointer" onClick={() => handleClick(value)}>
                        <p className="font-bold">{value.cat_name}</p>
                    </div>
                ))}
                </div>
            )}
        </section>
    )
}

export const selectedCategoryAtom = atom<Category>({ cat_id: undefined, cat_name: undefined });
export default Categories;
