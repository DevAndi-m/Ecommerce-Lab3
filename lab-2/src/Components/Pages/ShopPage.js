import React from 'react'
import '../css/Client.css'; 
import product from '../images/product-2.jpg';
import ClientHeader from '../ClientComps/ClientHeader';
import ClientFooter from '../ClientComps/ClientFooter';

const ShopPage = () => {

  return (
        <>
        <div className="container1">
          <ClientHeader />

          <div className="small-container1">
            <div className="row1 row1-2">
                <h2>All Products</h2>
                <select>
                    <option>Default sorting</option>
                    <option>Sort by price</option>
                    <option>Sort by popularity</option>
                    <option>Sort by rating</option>
                    <option>Sort by sale</option>
                </select>
            </div>

            <div className="row1">

                {/* CARD HERE */}

                <div className="col1-4">
                    <a href="products-details.html"><img src={product} alt="Downshifter Sports Shoes" /></a>
                    <a href="products-details.html"><h4>Downshifter Sports Shoes</h4></a>
                    <div className="rating1">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-half-o"></i>
                        <i className="fa fa-star-o"></i>
                    </div>
                    <p>$50.00</p>
                </div>

                <div className="col1-4">
                    <a href="products-details.html"><img src={product} alt="Downshifter Sports Shoes" /></a>
                    <a href="products-details.html"><h4>Downshifter Sports Shoes</h4></a>
                    <div className="rating1">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-half-o"></i>
                        <i className="fa fa-star-o"></i>
                    </div>
                    <p>$50.00</p>
                </div>

                <div className="col1-4">
                    <a href="products-details.html"><img src={product} alt="Downshifter Sports Shoes" /></a>
                    <a href="products-details.html"><h4>Downshifter Sports Shoes</h4></a>
                    <div className="rating1">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-half-o"></i>
                        <i className="fa fa-star-o"></i>
                    </div>
                    <p>$50.00</p>
                </div>

                <div className="col1-4">
                    <a href="products-details.html"><img src={product} alt="Downshifter Sports Shoes" /></a>
                    <a href="products-details.html"><h4>Downshifter Sports Shoes</h4></a>
                    <div className="rating1">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-half-o"></i>
                        <i className="fa fa-star-o"></i>
                    </div>
                    <p>$50.00</p>
                </div>
            </div>
          </div>

        
        </div>
        
        <ClientFooter />
        </>
  );
}

export default ShopPage;
