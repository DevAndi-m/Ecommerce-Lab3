import React, { useState } from 'react';
import plc from '../../placeholderImages/profilePLC.jpg';

function PurchasedProductCard({ product, purchasedProduct, setProducts, setPurchasedProducts, onRefresh }) {

    const [recentlyDeleted, setRecentlyDeleted] = useState(null);
    const [showDeletedMessage, setShowDeletedMessage] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleClick = (productID) => {
        setRecentlyDeleted(productID);
        setShowDeletedMessage(true);
        setProgress(0);

        fetch(`http://localhost:5000/api/purchasedProducts/${purchasedProduct._id}`, {
        method: 'DELETE',
        })
        .then(() => {
        let timer = 0;
        const interval = setInterval(() => {
            timer += 100;
            setProgress((timer / 4000) * 100); // Update progress based on time passed
            if (timer >= 4000) {
            clearInterval(interval);
            setShowDeletedMessage(false);
            setTimeout(() => {
                onRefresh();
            }, 500);
            }
        }, 100); // Update every 100ms (0.1s)
        })
        .catch(error => console.error('Error deleting product:', error));
    };

  if (!product) {
    return null; // Handle the case where product data isn't available
  }

  return (
    <div className='pCardMain'>
      <div className='rowOne'>
        <div className='rowOneLeft'>
          <div className='pCardTitle'>
            <h2>{product.productName}</h2>
            <p>Date Purchased: {new Date(purchasedProduct.productDateOfPurchase).toLocaleDateString()}</p>
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
        <button className='delProduct' onClick={() => handleClick(purchasedProduct._id)}>Delete Product</button>
      </div>
      <p className='pID'>Single product price: ${product.productPrice}, quantity: {purchasedProduct.quantityPurchased}, TOTAL: ${product.productPrice * purchasedProduct.quantityPurchased}</p>
      <p className='pID'>Product Category: {product.productCategory}</p>
      <p className='pID'>Product ID: {product._id}</p>
      <div className='rowThree'>
        <p>Published by:</p>
        <div className='pCardPublisher'>
          <img src={plc} alt="Publisher" />
          <p>{product.seller}</p>
        </div>    
      </div>
      <div className='rowThree'>
        <p>Purchased by:</p>
        <div className='pCardPublisher'>
          <img src={plc} alt="Publisher" />
          <p>{purchasedProduct.buyer}</p>
        </div>    
      </div>

      <div className="product-deleted" style={{ transform: showDeletedMessage ? 'translateX(0)' : 'translateX(300px)' }}>
          <div className='topPD'>
            <p>Product with ID:</p>
            <p>{recentlyDeleted}</p>
            <p>Has been deleted successfully</p>
          </div>
          <div className='barPD'>
            <div className='fullBar' style={{ width: `${progress}%` }}>
              
            </div>
          </div>
      </div>
    </div>
  );
}

export default PurchasedProductCard;
