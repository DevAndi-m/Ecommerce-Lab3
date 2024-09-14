import React, { useEffect, useState } from 'react';
import SmallPurchasedProduct from './SmallPurchasedProduct';
import { jwtDecode } from 'jwt_decode';

const getToken = () => localStorage.getItem('token');

const getUserIdFromToken = () => {
  const token = getToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id;
  }
  return null;
};

async function fetchPurchases(userId) {

}

function AccountHistory({ purchasedProducts }) {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = getUserIdFromToken();
      if (userId) {
        try {
          const fetchedPurchases = await fetchPurchases(userId);
          setPurchases(fetchedPurchases);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className='ppHolder'>
      {purchases.length === 0 ? (
        <p>No purchase history available.</p>
      ) : (
        purchases.map((purchase) => (
          <SmallPurchasedProduct
          />
        ))
      )}
    </div>
  );
}

export default AccountHistory;
