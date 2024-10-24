import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);

  const logout = () => {
    fetch(`http://localhost:5139/Kasutaja/logout`, { method: 'GET' })
      .then(res => res.text())
      .then(text => alert(text));
      setAuth(false);
  };

  useEffect(() => {
    fetch(`http://localhost:5139/Kasutaja/is-auth`, { method: 'GET' })
      .then(res => res.json())
      .then(json => setAuth(json))
  }, []); 

  return (
    <AuthContext.Provider value={{ isAuth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};