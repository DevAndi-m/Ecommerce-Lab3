import React from 'react';
import '../../css/Products.css';
import ProductCard from './ProductCard';

function ProductPlacement({ products, setProducts, onRefresh }) {
  return (
    <div className='productPlacement'>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          setProducts={setProducts}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
}

export default ProductPlacement;


