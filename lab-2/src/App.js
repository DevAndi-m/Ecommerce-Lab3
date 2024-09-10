import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from '../src/Components/Pages/HomePage';
import ShopPage from '../src/Components/Pages/ShopPage';
import SingleProductPage from './Components/Pages/SingleProductPage';
import AccountPage from '../src/Components/Pages/AccountPage';
import AdminPage from '../src/Components/Pages/AdminPage';
import NoPage from './Components/Pages/NoPage';
import CartPage from './Components/Pages/CartPage';

function App() {

  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/products/:productId' element={<SingleProductPage cart={cart} setCart={setCart} />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/myCart' element={<CartPage cart={cart} setCart={setCart} />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
