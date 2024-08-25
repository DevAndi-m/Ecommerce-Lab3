import React, { useState, useEffect } from 'react';
import '../css/Products.css';
import FilterSection from './ProductsComps/FilterSection';
import ProductPlacement from './ProductsComps/ProductPlacement';

function ProductsDashboard() {
  const [products, setProducts] = useState([]);

  // Function to fetch all products
  const fetchProducts = () => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='pHolder'>
      <div className='header'>
        <div className='title'>
          <h1>Products Dashboard</h1>
        </div>
      </div>
      <div className='mainProducts'>
        <ProductPlacement products={products} setProducts={setProducts} onRefresh={fetchProducts} />
        <FilterSection products={products} onRefresh={fetchProducts} />
      </div>
    </div>
  );
}

export default ProductsDashboard;
