import ecart from '../images/empty-cart.png';
import React, { useEffect, useState } from 'react';
import ClientHeader from '../ClientComps/ClientHeader';
import ClientFooter from '../ClientComps/ClientFooter';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function CartPage() {

  const [cart, setCart] = useState([{}]);

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
    return total.toFixed(2); 
  };

  const fetchSavedCart = async () => {
    try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        // Fetch the saved cart from PostgreSQL
        const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        const cartItems = response.data.cart;

        // For each item in the cart, fetch the full product details from MongoDB
        const updatedCart = await Promise.all(cartItems.map(async (cartItem) => {
            const productResponse = await axios.get(`http://localhost:5000/api/products/${cartItem.product_id}`);
            const productData = productResponse.data;

            return {
                ...cartItem, 
                productName: productData.productName,
                productPrice: productData.productPrice,
                productImage: productData.productImage, // Assuming your product has an image field
                productQuantity: productData.productQuantity,
            };
        }));

        setCart(updatedCart);
    } catch (error) {
        console.error('Error fetching saved cart or product data:', error);
    }
};


  useEffect(() => {
    fetchSavedCart();
  }, []);
  
  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      // Make the delete request to remove the item from the database
      await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
      
      // Refetch the saved cart from the database after deletion
      fetchSavedCart();

      const successMessage = document.querySelector('.csaved');
      successMessage.style.height = '30px'; 

      setTimeout(() => {
        successMessage.style.height = null; // Reset height after 3 seconds
      }, 3000);

    } catch (error) {
      const errMessage = document.querySelector('.csaved');
      errMessage.style.height = '30px'; 

      setTimeout(() => {
      errMessage.style.height = null; // Reset height after 3 seconds
      }, 3000);
    }
};

  const handlePurchase = async () => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axios.post('http://localhost:5000/api/purchases/purchase', {
            cart
        }, {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the header
            }
        });
        if (response.status === 200) {
            setCart([]);
            alert('Purchase successful!');
        }
    } catch (error) {
        console.error('Purchase failed:', error.response ? error.response.data : error.message);
        alert(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
};

return (
  <>
    <div className='container1'>
      <ClientHeader />
    </div>

    {cart && cart.length === 0 ? (
      <div className='eCart'>
        <img src={ecart} alt="Empty Cart" />
        <h1>Your cart seems to be empty</h1>
        <p>Browse the store in order to fill up your cart. After that you can purchase your selected items!</p>
      </div>
    ) : (
      <div className="small-container1 cart-page1">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.product_id}>
                <td>
                  <div className="cart-info1">
                    <img src={ecart} alt={item.productName} />
                    <div>
                      <p>{item.productName}</p>
                      <small>Price: ${item.productPrice}</small><br />
                      <button className='remvbtn' onClick={() => handleRemove(item.product_id)}>Remove</button>
                    </div>
                  </div>
                </td>
                <td><input type="number" value={item.quantity} readOnly /></td>
                <td>${item.productPrice * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-price1">
          <table>
            <tbody>
              <tr>
                <td>Total</td>
                <td>${calculateTotal()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='buyBtn'>
          <button onClick={handlePurchase}>Proceed with Purchase</button>
        </div>
        <div className='cmessages'>
          <p className='csaved'>Item was successfully removed</p>
        </div>
        <div className='cmessages'>
          <p className='cerr'>There was an error removing your item.</p>
        </div>
      </div>
    )}
    <ClientFooter />
  </>
);
}

export default CartPage;
