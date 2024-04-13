import React, { useState } from 'react'
import profileImage from '../placeholderImages/profilePLC.jpg';
import '../css/AdminPage.css';
import UsersDashboard from './UsersDashboard';
import ProductsDashboard from './ProductsDashboard';
import AdminDashboard from './AdminDashboard';
import HomePg from './HomePg';
import DefaultDash from './DefaultDash';

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
                                <li className={selected === 3 ? 'active' : ''} onClick={() => handleClick(3)}>Admins</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='pages'>
                    <h3>Pages</h3>
                    <div className='db'>
                        <hr className='line'></hr>
                        <div className='dashboardEntries'>
                            <ul>
                                <li className={selected === 4 ? 'active' : ''} onClick={() => handleClick(4)}>Home</li>
                                <li className={selected === 5 ? 'active' : ''} onClick={() => handleClick(5)}>Shop</li>
                                <li className={selected === 6 ? 'active' : ''} onClick={() => handleClick(6)}>Contact</li>
                                <li className={selected === 7 ? 'active' : ''} onClick={() => handleClick(7)}>About</li>
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
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='btns'>
                    <button className='lgout'>Log out</button>
                    <button className='swtch'>Switch account</button>
                </div>
            </div>
            <div className='mainContainer'>
                {selected === null && <DefaultDash />}
                {selected === 1 && <UsersDashboard />}
                {selected === 2 && <ProductsDashboard />}
                {selected === 3 && <AdminDashboard />}
                {selected === 4 && <HomePg />}
            </div>
        </div>
    )
}
