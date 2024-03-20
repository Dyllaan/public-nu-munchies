"use client"

import React, { useState } from 'react';
import axios from 'axios';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter search"
      />
      <Button onClick={handleSearch}>Search</Button>
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