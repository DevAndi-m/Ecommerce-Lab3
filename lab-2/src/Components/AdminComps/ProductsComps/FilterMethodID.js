import React, { useState } from 'react';
import '../../css/Products.css';

function FilterMethodID({ products, setFilteredProducts }) {
  const [searchID, setSearchID] = useState('');

  const handleSearch = () => {
    const filtered = products.filter(product => product._id.includes(searchID));
    setFilteredProducts(filtered);
};

  return (
    <div className='fmidMain'>
      <h2>Type Product ID</h2>
      <input
        type='text'
        value={searchID}
        onChange={(e) => setSearchID(e.target.value)}
      />
      <button className='fsButtons' onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default FilterMethodID;
