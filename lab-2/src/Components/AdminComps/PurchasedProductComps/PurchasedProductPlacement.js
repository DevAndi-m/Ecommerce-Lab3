import React, { useState, useEffect } from 'react';
import '../../css/Products.css';
import PurchasedProductCard from './PurchasedProductCard';

function PurchasedProductPlacement() {
  return (
    <div className='productPlacement'>
      <PurchasedProductCard />
      <PurchasedProductCard />
      <PurchasedProductCard />
      <PurchasedProductCard />
    </div>
  )
}

export default PurchasedProductPlacement
