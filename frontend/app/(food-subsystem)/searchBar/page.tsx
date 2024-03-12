'use client'

import {useState} from 'react';
import {SearchBar} from "../components/SearchBar";
import "../css/food.css";

function App()
{
    return (
        <div className="App">
            <div className="search-bar-container">
                <SearchBar />
                <div>SearchResults</div>
            </div>
        </div>
    );
}
export default App;