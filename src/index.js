import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Store from './store/Store';
import ToodeManage from './store/ToodeManage';
import Navigation from './main/Navigation';
import LogPage from './auth/LogPage';
import { AuthProvider } from './auth/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/ToodeManage" element={<ToodeManage />} />
          <Route path="/LogPage" element={<LogPage />} />
        </Routes>
      </Router>
    </AuthProvider>
</React.StrictMode>
);

