import React, { useState , useEffect } from 'react';
import plc from '../../placeholderImages/profilePLC.jpg';

function ProductCard({ product, setProducts, onRefresh }) {

  const [recentlyDeleted, setRecentlyDeleted] = useState(null);

  const handleClick = (productID) => {
    setRecentlyDeleted(productID)

    fetch(`http://localhost:5000/api/products/${product._id}`, {
      method: 'DELETE',
    }).then(() => {
      setTimeout(() => {
        onRefresh()
      }, 3000);
    })
    .catch(error => console.error('Error deleting product:', error));
  }

  return (
    <div className='pCardMain'>
      <div className='rowOne'>
        <div className='rowOneLeft'>
          <div className='pCardTitle'>
            <h2>{product.productName}</h2>
            <p>Date Published: {new Date(product.productDateOfListing).toLocaleDateString()}</p>
          </div>
          <div className='pCardDesc'>
            <p>Description:</p>
            <p>{product.description}</p>
          </div>
        </div>
        <div className='rowOneRight'>
          <img src={plc} alt="Product" />
        </div>
      </div>
      <div className='rowTwo'>
        <button className='delProduct' onClick={() => handleClick(product._id)}>Delete Product</button>
      </div>
      <p className='pID'>Product Price: ${product.productPrice}</p>
      <p className='pID'>Product Category: {product.productCategory}</p>
      <p className='pID'>Product ID: {product._id}</p>
      <div className='rowThree'>
        <p>Published by:</p>
        <div className='pCardPublisher'>
          <img src={plc} alt="Publisher" />
          <p>{product.seller}</p>
        </div>
      </div>
        <div className="product-deleted">
          <div className='topPD'>
            <p>Product with ID:</p>
            <p>{recentlyDeleted}</p>
            <p>Has been deleted successfully</p>
          </div>
          <div className='barPD'>
            <div className='fullBar' style={{ width: '50%' }}></div>
          </div>
        </div>
    </div>
  );
}

export default ProductCard;
