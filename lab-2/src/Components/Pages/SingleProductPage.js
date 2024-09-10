import React, { useEffect, useState } from 'react';
import ClientHeader from '../ClientComps/ClientHeader';
import ClientFooter from '../ClientComps/ClientFooter';
import product11 from '../images/product-11.jpg';
import product5 from '../images/product-5.jpg';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SmallProductCard from '../ClientComps/SmallProductCard';
import { jwtDecode } from 'jwt-decode';

function SingleProductPage({ cart, setCart }) {
  const { productId } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [productSeller, setProductSeller] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [er, setEr] = useState();
  const [ner, setNer] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(decodedToken.exp * 1000 > Date.now());
    }
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);

        const userResponse = await axios.get(`http://localhost:5000/api/users/${response.data.seller}`);
        setProductSeller(userResponse.data);

        // After fetching the product, fetch related products
        const productsResponse = await axios.get('http://localhost:5000/api/products');
        const filteredProducts = productsResponse.data
          .filter(p => p.productCategory === response.data.productCategory && p._id !== response.data._id) // Filter by category and exclude the current product
          .slice(0, 4); // Limit to 4 products
        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching product or related products:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/account', { state: { message: 'You have to be logged in to add something to cart' } });
      return;
    } else {
      const quantityInput = document.getElementById('quantityInput');
      const quantity = parseInt(quantityInput.value);
  
      if (quantity > 0 && quantity <= product.productQuantity) {
        setCart((prevCart) => [...prevCart, { ...product, quantity: quantity }]);
        setEr(null); // Clear the error message
        setNer('Added to cart!'); // Show the success message
        console.log(cart);
      } else {
        if (quantity > product.productQuantity) {
          setEr('Quantity exceeds available stock'); // Set the error message
          setNer(null); // Clear the success message
        } else {
          setEr('Invalid quantity'); // Set the error message
          setNer(null); // Clear the success message
        }
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='container1'>
        <ClientHeader />
      </div>

      <div className="small-container1 single-product1">
        <div className="row1">
          <div className="col1-2">
            <img src={product11} alt="Product" width="100%" id="productImg1" />

            <div className="small-img-row1">
              <div className="small-img-col1">
                <img src={product11} alt="Small Product" width="100%" className="small-img1" />
              </div>
              <div className="small-img-col1">
                <img src={product5} alt="Small Product" width="100%" className="small-img1" />
              </div>
              <div className="small-img-col1">
                <img src={product11} alt="Small Product" width="100%" className="small-img1" />
              </div>
              <div className="small-img-col1">
                <img src={product5} alt="Small Product" width="100%" className="small-img1" />
              </div>
            </div>
          </div>

          <div className="col1-2">
            <h1>{product.productName}</h1>
            <h4>${product.productPrice}</h4>
            <p>{product.productCategory}</p>
            <input type="number" id="quantityInput" defaultValue="1" /> <label>{product.productQuantity} left</label>
            <button onClick={() => handleAddToCart(product)} className="btn12">Add to Cart</button>
            <div className="message-container">
              {er && <label className="er">{er}</label>}
              {ner && <label className="ner">{ner}</label>}
            </div>
            <h3>Product Details <i className="fa fa-indent"></i></h3>
            <p>Published by {productSeller?.userName} - {new Date(product.productDateOfListing).toLocaleDateString()}</p>
            <br />
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      <div className="small-container1">
        <div className="row1 row1-2">
          <h2>Related Products</h2>
          <a href="/shop">
            <p>Back to shop</p>
          </a>
        </div>

        {/* Display related products */}
        <div className="row1">
          {relatedProducts.map(relatedProduct => (
            <SmallProductCard key={relatedProduct._id} product={relatedProduct} />
          ))}
        </div>
      </div>

      <ClientFooter />
    </>
  );
}

export default SingleProductPage;
