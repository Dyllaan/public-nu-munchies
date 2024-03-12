import React from 'react';
import CategoryList from './CategoryList';

const fetchData = () => { 
    fetch("http://localhost:3000/category")
    .then( response => response.json() )
    .then( json => setItems(json) )
    .catch(error => {
      console.error('Error fetching data:', error); 
});}
const App= () => {
    return (
        <div>
            <h1>My Application</h1>
            <CategoryList />
        </div>
    );
};

export default App;