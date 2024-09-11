import ecart from '../images/empty-cart.png';
import React from 'react';
import ClientHeader from '../ClientComps/ClientHeader';
import ClientFooter from '../ClientComps/ClientFooter';
import axios from 'axios';

function CartPage({ cart, setCart }) {

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
    return total.toFixed(2); 
  };
  
  const handleRemove = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);

      if (updatedCart.length === prevCart.length) {
        console.log("Product not found in cart");
        return prevCart; 
      }
      console.log("Product removed, new cart:", updatedCart);
      return updatedCart;
    });
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
                <tr key={item._id}>
                  <td>
                    <div className="cart-info1">
                      <img src={ecart} alt={item.productName} />
                      <div>
                        <p>{item.productName}</p>
                        <small>Price: ${item.productPrice}</small><br />
                        <button className='remvbtn' onClick={() => handleRemove(item._id)}>Remove</button>
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
        </div>
      )}
      <ClientFooter />
    </>
  );
}

export default CartPage;
