import React from 'react'
import logo from '../images/logo.png';
import cart from '../images/cart.png';
import menu from '../images/menu.png';
import { Link } from 'react-router-dom';

function ClientHeader() {
  return (
    <div className="navbar1">
            <div className="logo1">
              <a href="/"><img src={logo} alt="Logo" width="125px" /></a>
            </div>
            <nav className='nav1'>
              <ul id="MenuItems">
                <li>
                    <Link to='/home'> 
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link to='/shop'> 
                        <a>Shop</a>
                    </Link>
                </li>
                <li>
                    <Link to='/account'> 
                        <a>Account</a>
                    </Link>
                </li>
                <li>
                    <Link to='/admin'>
                        <a>Admin</a>
                    </Link>
                </li>
              </ul>
            </nav>
            <a href="/cart"><img src={cart} alt="Cart" width="30px" height="30px" /></a>
            <img src={menu} alt="Menu" className="menu-icon1" />
    </div>
  )
}

export default ClientHeader

