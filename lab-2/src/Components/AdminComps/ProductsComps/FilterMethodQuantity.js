import React, { useState } from 'react';
import '../../css/Products.css';

function FilterMethodQuantity({ products, setFilteredProducts }) {
  const [quantity, setQuantity] = useState('');

  const handleSearch = () => {
    if (quantity.trim()) {
      const filtered = products.filter(product => 
        product.productQuantity === parseInt(quantity, 10)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  return (
    <div className='fmidMain'>
      <h2>Search by Quantity</h2>
      <input 
        type='text' 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} 
        placeholder='Enter quantity' 
      />
      <button className='fsButtons' onClick={handleSearch}>Search</button>
    </div>
  );
}

export default FilterMethodQuantity;
