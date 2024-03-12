
import category from '../components/CategoryList'


import React from 'react';

const categories = ['example1', 'example2', 'example3', 'example4'];

const CategoryList = () => {
    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map((cat, index) => (
                    <li key={index}>{cat}</li>
                ))}
            </ul>
            <p>Hello world</p> {/* This should be inside the div */}
        </div>
    );
};

export default CategoryList;