// Navigation.js
import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { AuthContext } from './AuthContext';

function Navigation() {
  const { isAuth, logout } = useContext(AuthContext);

  return (
    <nav>
        <ul>
            <li><Link to="/">Kodu</Link></li>
            {isAuth ? (
                <>
                <li><Link to="/ToodeManage">Tootehaldus</Link></li>
                <li className='rightNav' onClick={logout}><Link to="/">Logi välja</Link></li>
                </>   
            ) : (
                <li className='rightNav'><Link to="/LogPage">Logi sisse</Link></li>
            )}
        </ul>
    </nav>
  );
}

export default Navigation;