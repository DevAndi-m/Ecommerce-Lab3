import React, { useState , useEffect } from 'react';
import '../css/Products.css';
import PurchasedFilterSection from './PurchasedProductComps/PurchasedFilterSection';
import PurchasedProductPlacement from './PurchasedProductComps/PurchasedProductPlacement';

function PurchasedProductsDashboard() {

  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchPurchasedProducts = () => {
    fetch('http://localhost:5000/api/purchasedProducts')
      .then(response => response.json())
      .then(data => setPurchasedProducts(data))
      .catch(error => console.error('Error fetching purchased products:', error));
  };

  const fetchProducts = () => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const fetchAll = () => {
    fetchPurchasedProducts();
    fetchProducts();
  };
  
  useEffect(() => {
    fetchAll();
  }, []);
  
  return (
    <div className='pHolder'>
      <div className='header'>
          <div className='title'>
            <h1>Purchased Products Dashboard</h1>
          </div>
      </div>
      <div className='mainProducts'>
        <PurchasedProductPlacement 
          products={products} setProducts={setProducts} 
          purchasedProducts={purchasedProducts} setPurchasedProducts={setPurchasedProducts}  
          onRefresh={fetchAll}
        />
        <PurchasedFilterSection 
          purchasedProducts={purchasedProducts} 
          onRefresh={fetchAll}
        />
      </div>
    </div>
  )
}

export default PurchasedProductsDashboard
