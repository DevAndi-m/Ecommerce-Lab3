import ecart from '../images/empty-cart.png';
import React from 'react';
import ClientHeader from '../ClientComps/ClientHeader';
import ClientFooter from '../ClientComps/ClientFooter';

function CartPage({ cart, setCart }) {

  // Calculate subtotal for each item and the total
  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
  };

  const handleRemove = (productId) => {
    // Remove the product from the cart
    setCart(cart.filter(item => item._id !== productId));
  };

  return (
    <>
      <div className='container1'>
        <ClientHeader />
      </div>

      {/* Check if cart is empty */}
      {cart.length === 0 ? (
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
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="cart-info1">
                      <img src={ecart} alt={item.productName} />
                      <div>
                        <p>{item.productName}</p>
                        <small>Price: ${item.productPrice}</small><br />
                        <a href="/" onClick={() => handleRemove(item._id)}>Remove</a>
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
        </div>
      )}
      
      <ClientFooter />
    </>
  );
}

export default CartPage;
