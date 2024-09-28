import React, { useState, useEffect } from 'react';
import AccountInfo from './AccountInfo';
import AccountPost from './AccountPost';
import AccountHistory from './AccountHistory';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function ClientAccountLogged({ setIsLoggedIn }) {
  const [activePage, setActivePage] = useState('info');
  const [userData, setUserData] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  // Fetch logged-in user data, products, and purchased products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Ensure this matches the key used for logout
        if (!token) return;

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;  // Use `id` from token
        
        const headers = { 'Authorization': `Bearer ${token}` };

        // Fetch logged-in user info
        const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`, { headers });
        setUserData(userResponse.data);

        // Fetch products listed by the user
        const productsResponse = await axios.get('http://localhost:5000/api/products', { headers });
        const userListedProducts = productsResponse.data.filter(
          product => product.seller === userId
        );
        setUserProducts(userListedProducts);

        // Fetch purchased products
        const purchasedResponse = await axios.get('http://localhost:5000/api/purchasedProducts', { headers });
        const userPurchasedProducts = purchasedResponse.data.filter(
          purchase => purchase.buyer === userId
        );
        setPurchasedProducts(userPurchasedProducts);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (page) => {
    setActivePage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  // Ensure the key matches
    localStorage.removeItem('userData'); 
    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    setIsLoggedIn(false); // Update the logged-in state in parent component
    window.location.reload(); // Refresh the page
  };

  return (
    <>
      <div className='container2'>
        <div className='accountBtns2'>
          <button
            className={activePage === 'info' ? 'current' : ''}
            onClick={() => handleButtonClick('info')}
          >
            Account Info
          </button>
          <button
            className={activePage === 'post' ? 'current' : ''}
            onClick={() => handleButtonClick('post')}
          >
            Create a Listing
          </button>
          <button
            className={activePage === 'history' ? 'current' : ''}
            onClick={() => handleButtonClick('history')}
          >
            Purchase History
          </button>

          <button onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
      
      <div className='mPages'>
        {/* Conditionally render the component based on the active page */}
        {activePage === 'info' && userData && (
          <AccountInfo 
            userData={userData} 
            userProducts={userProducts} 
            purchasedProducts={purchasedProducts} 
          />
        )}
        {activePage === 'post' && <AccountPost userProducts={userProducts} />}
        {activePage === 'history' && <AccountHistory purchasedProducts={purchasedProducts} />}
      </div>
    </>
  );
}

export default ClientAccountLogged;
