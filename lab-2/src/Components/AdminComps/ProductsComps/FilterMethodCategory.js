import React, { useState } from 'react';
import '../../css/Products.css';

function FilterMethodCategory({ products, setFilteredProducts }) {
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    if (category.trim()) {
      const filtered = products.filter(product => 
        product.productCategory.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      // If no category is entered, you might want to display all products or none.
      setFilteredProducts([]);
    }
  };

  return (
    <div className='fmidMain'>
      <h2>Search by Category</h2>
      <input 
        type='text' 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        placeholder='Enter category' 
      />
      <button className='fsButtons' onClick={handleSearch}>Search</button>
    </div>
  );
}

export default FilterMethodCategory;
