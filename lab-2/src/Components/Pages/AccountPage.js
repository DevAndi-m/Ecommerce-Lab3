import React, { useState, useEffect } from 'react';
import ClientHeader from '../ClientComps/ClientHeader';
import productImage from '../images/image1.png';
import ClientFooter from '../ClientComps/ClientFooter';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';

const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ userName: '', userEmail: '', userPassword: '' });
  const location = useLocation();
  const [error, setError] = useState('');
  const [noError, setnoError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    // Check if there's an error message passed from SingleProductPage.js
    if (location.state?.errorMessage) {
      setError(location.state.errorMessage);
      setIsLogin(true)
    }
  }, [location]);

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        const decodedToken = jwtDecode(token);
        const isTokenValid = decodedToken.exp * 1000 > Date.now(); // Check if token is expired

        setTokenValid(isTokenValid);
        setIsLoggedIn(isTokenValid); // Set login state based on token validity
      }
    };

    // Check every second
    const intervalId = setInterval(checkTokenValidity, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleToggle = (login) => {
    setIsLogin(login);
    setError('');
    setnoError('');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const url = isLogin ? 'http://localhost:5000/api/users/login' : 'http://localhost:5000/api/users/register';
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token);
        const isTokenValid = decodedToken.exp * 1000 > Date.now();

        setTokenValid(isTokenValid);
        setIsLoggedIn(isTokenValid);

        setnoError('Success!');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <>
      <div className="container1">
        <ClientHeader />
      </div>

      <div className="account-page1">
        <div className="container1">
          <div className="row1">
            <div className="col1-2">
              <img src={productImage} alt="Account" width="100%" />
            </div>
            <div className="col1-2">
              <div className="form-container1">
                <div className="form-btn1">
                  <span onClick={() => handleToggle(true)}>Login</span>
                  <span onClick={() => handleToggle(false)}>Register</span>
                  <hr
                    id="Indicator"
                    style={{ transform: isLogin ? 'translateX(0px)' : 'translateX(100px)' }}
                  />
                </div>
                <div className="form-slide1">
                  <form
                    id="LoginForm1"
                    onSubmit={handleSubmit}
                    style={{
                      transform: isLogin ? 'translateX(0px)' : 'translateX(-300px)',
                    }}
                  >
                    <input
                      type="text"
                      name="userName"
                      placeholder="Username"
                      value={formData.userName}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="password"
                      name="userPassword"
                      placeholder="Password"
                      value={formData.userPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <button type="submit" className="btn1">Login</button>
                    <a href="/">Forgot password?</a>
                    {noError && <p className="accNoErrorTxt">{noError}</p>}
                    {error && <p className="accErrorTxt">{error}</p>}
                  </form>
                  <form
                    id="RegForm1"
                    onSubmit={handleSubmit}
                    style={{
                      transform: isLogin ? 'translateX(300px)' : 'translateX(0px)',
                    }}
                  >
                    <input
                      type="text"
                      name="userName"
                      placeholder="Username"
                      value={formData.userName}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="email"
                      name="userEmail"
                      placeholder="Email"
                      value={formData.userEmail}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="password"
                      name="userPassword"
                      placeholder="Password"
                      value={formData.userPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <button type="submit" className="btn1">Register</button>
                    {noError && <p className="accNoErrorTxt">{noError}</p>}
                    {error && <p className="accErrorTxt">{error}</p>}
                  </form>

                    {isLoggedIn && <p className='tkn'>Token Valid</p>}
                    {!isLoggedIn && <p className='tkn'>Token Not Valid</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClientFooter />
    </>
  );
};

export default AccountPage;
