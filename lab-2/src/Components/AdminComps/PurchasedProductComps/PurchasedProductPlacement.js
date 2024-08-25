import React from 'react';
import '../../css/Products.css';
import PurchasedProductCard from './PurchasedProductCard';

function PurchasedProductPlacement({ products, purchasedProducts, setProducts, setPurchasedProducts, onRefresh }) {
  return (
    <div className='productPlacement'>
      {purchasedProducts.map((purchasedProduct) => {
        // Find the corresponding product data
        const product = products.find(p => p._id === purchasedProduct.product);

        return (
          <PurchasedProductCard
            key={purchasedProduct._id}
            product={product}
            purchasedProduct={purchasedProduct}
            setProducts={setProducts}
            setPurchasedProducts={setPurchasedProducts}
            onRefresh={onRefresh}
          />
        );
      })}
    </div>
  );
}

export default PurchasedProductPlacement;

