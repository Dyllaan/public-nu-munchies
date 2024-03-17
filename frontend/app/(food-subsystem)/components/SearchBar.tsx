'use client'

import React, {useState} from "react";
import "../css/SearchBar.css"
import {FaSearch} from "react-icons/fa"

export const SearchBar = () => {
    const [input, setInput] = useState("");
    const fetchData = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json)
    }
    const handleChange = (value: string) => {
        setInput(value);
        fetchData();
    }

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon"/>
            <input 
                placeholder="Type to search....." 
                value={input} 
                onChange= {(e) => handleChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar