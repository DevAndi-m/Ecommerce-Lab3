import React, { useState, useEffect } from 'react';
import '../../css/Products.css';
import ProductCard from './ProductCard';

function ProductPlacement() {
  return (
    <div className='productPlacement'>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}

export default ProductPlacement
