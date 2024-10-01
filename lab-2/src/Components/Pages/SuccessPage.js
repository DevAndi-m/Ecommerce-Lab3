import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode} from 'jwt-decode';

const SuccessPage = ({ setCart }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePostPurchase = async () => {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
  
      try {
        // Log to confirm the token and userId are being decoded correctly
        console.log("Token:", token);
        console.log("User ID:", userId);
  
        // Fetch cart from PostgreSQL
        const { data: cartData } = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        const cartItems = cartData.cart;
  
        // Log to verify cart data is fetched correctly
        console.log("Cart Items:", cartItems);
  
        // Call purchaseProducts API
        const purchaseResponse = await axios.post(
        'http://localhost:5000/api/purchases/purchase',
        { cart: cartItems, userId },
        {
            headers: { Authorization: `Bearer ${token}` }, // Include the token in the Authorization header
        }
        );
          
  
        // Log response from the API to verify the purchase was processed
        console.log("Purchase Response:", purchaseResponse.data);
  
        // Clear the cart in the front-end and log success message
        setCart([]);
        alert('Purchase successful and cart cleared!');
        navigate('/myCart');
      } catch (error) {
        // Log errors to the console for debugging
        console.error('Error during purchase process:', error);
      }
    };
  
    handlePostPurchase();
  }, [setCart, navigate]);
  
  
  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Your purchase was successful. Thank you for your order!</p>
    </div>
  );
};

export default SuccessPage;
