import React, { useState } from 'react';
import '../../css/Products.css';

function FilterMethodName({ products, setFilteredProducts }) {
  const [searchName, setSearchName] = useState('');

  const handleSearch = () => {
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className='fmidMain'>
      <h2>Type Product Name</h2>
      <input 
        type='text' 
        value={searchName} 
        onChange={(e) => setSearchName(e.target.value)} 
      />
      <button className='fsButtons' onClick={handleSearch}>Search</button>
    </div>
  );
}

export default FilterMethodName;
