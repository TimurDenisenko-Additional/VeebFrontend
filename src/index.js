import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Store from './Store';
import ToodeManage from './ToodeManage';
import Navigation from './Navigation';
import LogPage from './LogPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Navigation isAuthenticated={isAuthenticated}/>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/ToodeManage" element={<ToodeManage />} />
        <Route path="/LogPage" element={<LogPage />} />
      </Routes>
    </Router>
</React.StrictMode>
);

