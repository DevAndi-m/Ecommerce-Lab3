import React from 'react'
import ClientHeader from '../ClientComps/ClientHeader'
import product1 from '../images/buy-1.jpg';
import product2 from '../images/buy-2.jpg';
import product3 from '../images/buy-3.jpg';
import ClientFooter from '../ClientComps/ClientFooter';

function CartPage() {
  return (
    <>
        <div className='container1'>
            <ClientHeader />
        </div>
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
          <tr>
            <td>
              <div className="cart-info1">
                <img src={product1} alt="Red Printed T-Shirt" />
                <div>
                  <p>Red Printed T-Shirt</p>
                  <small>Price: $50.00</small><br />
                  <a href="/">Remove</a>
                </div>
              </div>
            </td>
            <td><input type="number" value="1" /></td>
            <td>$50.00</td>
          </tr>
          <tr>
            <td>
              <div className="cart-info1">
                <img src={product2} alt="Red Printed T-Shirt" />
                <div>
                  <p>Red Printed T-Shirt</p>
                  <small>Price: $50.00</small><br />
                  <a href="/">Remove</a>
                </div>
              </div>
            </td>
            <td><input type="number" value="1" /></td>
            <td>$50.00</td>
          </tr>
          <tr>
            <td>
              <div className="cart-info1">
                <img src={product3} alt="Red Printed T-Shirt" />
                <div>
                  <p>Red Printed T-Shirt</p>
                  <small>Price: $50.00</small><br />
                  <a href="/">Remove</a>
                </div>
              </div>
            </td>
            <td><input type="number" value="1" /></td>
            <td>$50.00</td>
          </tr>
        </tbody>
      </table>

      <div className="total-price1">
        <table>
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>$200.00</td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>$35.00</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>$230.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <ClientFooter />
    </>
  )
}

export default CartPage
