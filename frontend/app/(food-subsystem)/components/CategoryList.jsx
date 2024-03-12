'use client'
import {useEffect, useState} from 'react'

const CategoryList = () => {
    const [fetchError, setFetchError] = useState(null)
    const [cat_name, setCatName] = useState(null)

    useEffect(() => {
        const fetchCatName = async() => {
            const { data, error} = await supabase
                .from(categories)
                .select()

            if (error)
            {
                setFetchError('Could not fetch the name')
                setCatName(null)
                console.log(error)
            }
            if (data)
            {
                setCatName(data)
                setFetchError(null)
            }
        }

        fetchCatName()
    }, [])

    return (
        <div className="category">
            {fetchError && (<p>{fetchError}</p>)}
            {cat_name && (
                <div className="catName">
                    {cat_name.map(cat_name => (
                        <p>{cat_name.title}</p>
                    ))}
                </div>
            )}
        </div>
    )
}
export default CategoryList