// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Kodu</Link></li>
        <li><Link to="/ToodeManage">Tootehaldus</Link></li>
        <li className='rightNav'><Link to="/LogPage">Logi sisse</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;