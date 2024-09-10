import React from 'react'
import productimg from '../images/product-2.jpg';

function SmallProductCard({ product }) {
  return (
    <div className="col1-4">
        <a href="products-details.html"><img src={productimg} alt="Downshifter Sports Shoes" /></a>
        <a href="products-details.html"><h4>{product.productName}</h4></a>
        <p>${product.productPrice.toFixed(2)}</p> 
        <p>{product.productQuantity} left</p>
        <p>{product.productCategory}</p>
    </div>
  )
}

export default SmallProductCard
