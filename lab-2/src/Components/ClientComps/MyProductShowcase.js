import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // To handle redirection
import product11 from '../images/product-11.jpg';
import product5 from '../images/product-5.jpg';

function ProductShowcase({ product, productSeller, handleAddToCart, er, ner }) {
  const [editableProduct, setEditableProduct] = useState({ ...product });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleApplyChanges = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${product._id}`, editableProduct);
      setMessage('Product Successfully Updated!');
      setTimeout(() => setMessage(''), 3000); // Hide message after 3 seconds
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleRemoveListing = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${product._id}`);
      setMessage('Your product has been deleted.');
      setTimeout(() => {
        setMessage('');
        navigate('/shop');
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="small-container1 single-product1">
      <div className="row1">
        <div className="col1-2">
          <img src={product11} alt={editableProduct.productName} width="100%" id="productImg1" />
          <div className="small-img-row1">
            <div className="small-img-col1">
              <img src={product5} alt="Small Product" width="100%" className="small-img1" />
            </div>
            {/* Add additional small images dynamically if needed */}
          </div>
        </div>

        <div className="col1-2">
          <div className='col1-21'>
            <label>Product title:</label>
            <input
              className='colInpt'
              type="text"
              name="productName"
              value={editableProduct.productName}
              onChange={handleInputChange}
            />

            <label>Product price:</label>
            <input
              className='colInpt'
              type="number"
              name="productPrice"
              value={editableProduct.productPrice}
              onChange={handleInputChange}
            />

            <label>Product category:</label>
            <select
              className='colInpt'
              name="productCategory"
              value={editableProduct.productCategory}
              onChange={handleInputChange}
            >
              <option>Clothing</option>
              <option>Food & Drink</option>
              <option>Fitness</option>
              <option>Vehicles</option>
              <option>Accessories</option>
              <option>Furniture</option>
              <option>Electronics</option>
            </select>

            <label>Product quantity:</label>
            <input
              className='colInpt'
              type="number"
              name="productQuantity"
              value={editableProduct.productQuantity}
              onChange={handleInputChange}
            />
          </div>
          <h3>Product Details <i className="fa fa-indent"></i></h3>
          <p>Published by {productSeller?.userName} - {new Date(editableProduct.productDateOfListing).toLocaleDateString()}</p>
          <br />
          <label>Product description:</label>
          <textarea
            name="description"
            value={editableProduct.description}
            onChange={handleInputChange}
            rows="4"
            cols="50"
          />
          <button onClick={handleApplyChanges} className="btn12">Apply Changes</button>
          <button onClick={handleRemoveListing} className="btn12">Remove Listing</button>
          <div className="message-container">
            {message && (
              <p className={message.includes('deleted') ? 'pds' : 'psu'}>
                {message}
              </p>
            )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default ProductShowcase;
