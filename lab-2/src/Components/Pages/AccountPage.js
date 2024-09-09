import React, { useState } from 'react';
import ClientHeader from '../ClientComps/ClientHeader';
import productImage from '../images/image1.png';
import ClientFooter from '../ClientComps/ClientFooter';
import axios from 'axios';

const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleToggle = (login) => {
    setIsLogin(login);
    setError(''); // Clear error when switching between forms
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    const url = isLogin ? '/api/users/login' : '/api/users/register';
    
    try {
      const response = await axios.post(url, formData);
      // Handle success (e.g., navigate to the dashboard or show a success message)
      console.log('Success:', response.data);
    } catch (error) {
      // Handle error and show the error message
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
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button type="submit" className="btn1">Login</button>
                    <a href="/">Forgot password?</a>
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
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button type="submit" className="btn1">Register</button>
                    {error && <p className="accErrorTxt">{error}</p>}
                  </form>
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
