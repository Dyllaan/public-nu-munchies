/*'use client'

import {useState} from 'react';
import {SearchBar} from "../components/SearchBar";
import "../css/food.css";

function App()
{
    return (
        <div className="App">
            <div className="search-bar-container">
                <SearchBar />
            </div>
        </div>
    );
}
export default App;*/

/*'use client'

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

export default SearchBar*/
"use client"

import React, { useState } from 'react';
import axios from 'axios';

import "../css/SearchBar.css"
import {FaSearch} from "react-icons/fa"

interface SearchResult {
  businesses: any[]; // Define your business data type
  items: any[]; // Define your item data type
}
const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get<SearchResult>('/search', {
        params: { search: searchQuery }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="input-wrapper">
        <FaSearch id="search-icon"/>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter search query"
      />
      <button onClick={handleSearch}>Search</button>
      {searchResults && (
        <div>
          {searchResults.businesses.length > 0 && (
            <div>
              <h2>Businesses</h2>
              <ul>
                {searchResults.businesses.map((business, index) => (
                  <li key={index}>{business.business_name}</li>
                ))}
              </ul>
            </div>
          )}
          {searchResults.items.length > 0 && (
            <div>
              <h2>Items</h2>
              <ul>
                {searchResults.items.map((item, index) => (
                  <li key={index}>{item.item_name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
