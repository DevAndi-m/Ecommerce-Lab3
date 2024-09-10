import React, { useState, useEffect } from 'react';
import '../css/Client.css';
import ClientHeader from '../ClientComps/ClientHeader';
import ClientFooter from '../ClientComps/ClientFooter';
import SmallProductCard from '../ClientComps/SmallProductCard';
import ClientIcons from '../ClientComps/ClientIcons';
import AdminIcons from '../AdminComps/AdminIcons';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All'); // Default category
    const [sortBy, setSortBy] = useState('dateListed'); // Default sort
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/products');   
  
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();   
  
    }, []);
  
    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };
  
    const handleSortByChange = (event) => {
      setSortBy(event.target.value);   
  
    };
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleClearSearch = () => {
      setSearchTerm('');
    };
  
    const filteredProducts = products.filter((product) => {
      // Filter by category
      if (selectedCategory !== 'All' && product.productCategory !== selectedCategory) {
        return false;
      }
  
      // Filter by search term
      if (searchTerm && !product.productName.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
  
      return true; // Product is included
    });
  
    // Sort the filtered products based on the selected option
    const sortedProducts = filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'dateListed':
          return new Date(a.productDateOfListing) - new Date(b.productDateOfListing);
        case 'priceAsc':
          return a.productPrice - b.productPrice;
        case 'priceDesc':
          return b.productPrice - a.productPrice;
        case 'quantity':
          return a.productQuantity - b.productQuantity;
        default:
          return 0;
      }
    });
  
  return (
    <>
      <div className="container1">
        <ClientHeader />

        <div className="small-container1">
          <div className='searchdiv'>
            <input type='text' placeholder='Search for a specific product' onChange={handleSearch} />
            <button onClick={handleClearSearch}>{searchTerm ? 'X' : 'Search'}</button>
          </div>

          <div className="row1 row1-2">
            <div className='catdiv'>
              <h2>Category:</h2>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="All">All</option>
                <option>Electronics</option>
                <option>Food & Drink</option>
                <option>Clothing</option>
                <option>Vehicles</option>
                <option>Fitness</option>
                <option>Wearables</option>
                <option>Home Appliances</option>
                {/* ... other categories */}
              </select>
            </div>

            <select value={sortBy} onChange={handleSortByChange}>
              <option value="dateListed">Sort by date listed</option>
              <option value="priceAsc">Sort by price (Low to High)</option>
              <option value="priceDesc">Sort by price (High to Low)</option>
              <option value="quantity">Sort by quantity</option>
            </select>
          </div>

          <div className="row1">
            {sortedProducts.map((product) => (
              <SmallProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className='smholder'>
            <button className='sm'>See More</button>
          </div>
        </div>
      </div>
      <ClientFooter />
    </>
  );
};

export default ShopPage;