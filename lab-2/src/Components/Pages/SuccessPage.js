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
        // Fetch cart from PostgreSQL instead of localStorage
        const { data: cartData } = await axios.get(`http://localhost:5000/api/cart/${userId}`);

        const cartItems = cartData.cart;  // Assuming cart is returned in this format

        // Clear the user's cart in PostgreSQL
        for (const item of cartItems) {
          const { product_id } = item; // Adjust this field based on your schema
          await axios.delete(`http://localhost:5000/api/cart/${userId}/${product_id}`);
        }

        // Call purchaseProducts API to save purchased products
        await axios.post('http://localhost:5000/api/purchases/purchase', {
          cart: cartItems, // Send the fetched cart data from PostgreSQL
          userId,
        });

        // Clear the cart in the front-end
        setCart([]);

        alert('Purchase successful and cart cleared!');
        navigate('/myCart');  // Optionally redirect back to the cart or another page
      } catch (error) {
        console.error('Error clearing cart or saving purchase:', error);
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
