import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from '../src/Components/Pages/HomePage';
import ShopPage from '../src/Components/Pages/ShopPage';
import AccountPage from '../src/Components/Pages/AccountPage';
import AdminPage from '../src/Components/Pages/AdminPage'
import NoPage from './Components/Pages/NoPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
