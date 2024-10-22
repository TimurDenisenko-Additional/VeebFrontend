// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation(isAuthenticated) {

    function logout(){
        fetch(`http://localhost:5139/Kasutaja/logout`, {"method": "GET"})
          .then(res => res.text())
          .then(text => alert(text));
          isAuthenticated = false;
    }

  return (
    <nav>
        <ul>
            <li><Link to="/">Kodu</Link></li>
            {isAuthenticated ? (
                <>
                <li><Link to="/ToodeManage">Tootehaldus</Link></li>
                <li className='rightNav' onClick={() => logout()}>Logi välja</li>
                </>   
            ) : (
                <li className='rightNav'><Link to="/LogPage">Logi sisse</Link></li>
            )}
        </ul>
    </nav>
  );
}

export default Navigation;