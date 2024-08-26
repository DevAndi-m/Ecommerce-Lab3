import React, { useState } from 'react';
import '../../css/Products.css';

function FilterMethodUserPublished({ products, setFilteredProducts }) {
  const [userPublished, setUserPublished] = useState('');

  const handleSearch = () => {
    const filtered = products.filter(product =>
      product.seller.toLowerCase().includes(userPublished.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className='fmidMain'>
      <h2>Search by user who published</h2>
      <input
        type='text'
        value={userPublished}
        onChange={(e) => setUserPublished(e.target.value)}
      />
      <button className='fsButtons' onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default FilterMethodUserPublished;

