import React, { useState } from 'react'
import profileImage from '../placeholderImages/profilePLC.jpg';
import '../css/AdminPage.css';
import UsersDashboard from '../AdminComps/UsersDashboard';
import ProductsDashboard from '../AdminComps/ProductsDashboard';
import PurchasedProductsDashboard from '../AdminComps/PurchasedProductsDashboard';
import DefaultDash from '../AdminComps/DefaultDash';
import AdminCons from '../AdminComps/AdminCons';
import { Link } from 'react-router-dom';

export default function AdminPage() {

    const [selected, setSelected] = useState(null);

    const handleClick = (id) => {
        setSelected(prevSelected => prevSelected === id ? null : id);
    };

    return (
        <div className='adminPage'>
            <div className='menu'>
                <div className='logo'>
                    <h1>Logged in as:</h1>
                </div>
                <div className='adminProfile'>
                    <div className='pimage'>
                        <img src={profileImage}></img>
                    </div>
                    <div className='pinfo'>
                        <h3>Administrator</h3>
                        <p>Filan Baba</p>
                    </div>
                </div>
                <hr></hr>
                <div className='dashboard'>
                    <h3>Dashboard</h3>
                    <div className='db'>
                        <hr className='line'></hr>
                        <div className='dashboardEntries'>
                            <ul>
                                <li className={selected === 1 ? 'active' : ''} onClick={() => handleClick(1)}>Users</li>
                                <li className={selected === 2 ? 'active' : ''} onClick={() => handleClick(2)}>Products</li>
                                <li className={selected === 3 ? 'active' : ''} onClick={() => handleClick(3)}>Purchased</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='analytics'>
                    <h3>Analytics</h3>
                    <div className='db'>
                        <hr className='line'></hr>
                        <div className='dashboardEntries'>
                            <ul>
                                <li className={selected === 8 ? 'active' : ''} onClick={() => handleClick(8)}>Users</li>
                                <li className={selected === 9 ? 'active' : ''} onClick={() => handleClick(9)}>Products</li>
                                <li className={selected === 10 ? 'active' : ''} onClick={() => handleClick(10)}>Console</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='btns'>
                    <button className='lgout'>Log out</button>
                    <Link to='/home'>
                        <button className='swtch'>Back to shop</button>
                    </Link>
                    
                </div>
            </div>
            <div className='mainContainer'>
                {selected === null && <DefaultDash />}
                {selected === 1 && <UsersDashboard />}
                {selected === 2 && <ProductsDashboard />}
                {selected === 3 && <PurchasedProductsDashboard />}
                {selected === 10 && <AdminCons />}
            </div>
        </div>
    )
}
