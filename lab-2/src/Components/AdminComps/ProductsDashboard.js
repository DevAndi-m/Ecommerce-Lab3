import React, { useState, useEffect } from 'react';
import '../css/Products.css';
import FilterSection from './ProductsComps/FilterSection';
import ProductPlacement from './ProductsComps/ProductPlacement';

function ProductsDashboard() {
  return (
    <div className='pHolder'>
      <div className='header'>
          <div className='title'>
            <h1>Products Dashboard</h1>
          </div>
      </div>
      <div className='mainProducts'>
        <ProductPlacement />
        <FilterSection />
      </div>
    </div>
  )
}

export default ProductsDashboard
