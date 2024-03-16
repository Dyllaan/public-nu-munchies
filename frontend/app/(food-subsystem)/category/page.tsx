'use client'

import React, { useState, useEffect } from 'react';


function Items() {
  const [category, setCategory] = useState([]);
  
  const fetchData = () => { 
    fetch("http://localhost:8080/getcategories")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => setCategory(json))
      .catch(error => {
        console.error('Error fetching data:', error); 
      });
  };

  useEffect(fetchData, []);

  const itemsDisplay = (
    <div className="bg-[#eaeaea] my-2 rounded">
      {category.map((category, key) => (
        <div key={key} className="mb-2">
          <p className="font-bold">{category.cat_name}</p>
        </div>
      ))}
    </div>
  );

}

export default Items;
