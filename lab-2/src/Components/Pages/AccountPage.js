import React, { useState } from 'react'
import ClientHeader from '../ClientComps/ClientHeader'
import productImage from '../images/image1.png';
import ClientFooter from '../ClientComps/ClientFooter';

const AccountPage = () => {
    const [isLogin, setIsLogin] = useState(true);
  
    const handleToggle = () => {
      setIsLogin(!isLogin);
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
                <span onClick={() => setIsLogin(true)}>Login</span>
                <span onClick={() => setIsLogin(false)}>Register</span>
                <hr id="Indicator" style={{ transform: isLogin ? 'translateX(0px)' : 'translateX(100px)' }} />
              </div>
              {isLogin ? (
                <form id="LoginForm1">
                  <input type="text" placeholder="Username" />
                  <input type="password" placeholder="Password" />
                  <button type="submit" className="btn1">Login</button>
                  <a href="/">Forgot password?</a>
                </form>
              ) : (
                <form id="RegForm1">
                  <input type="text" placeholder="Username" />
                  <input type="email" placeholder="Email" />
                  <input type="password" placeholder="Password" />
                  <button type="submit" className="btn1">Register</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    <ClientFooter />
    </>
  )
}

export default AccountPage
