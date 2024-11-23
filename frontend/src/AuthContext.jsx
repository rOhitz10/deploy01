import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('expiry');
    return token && expiry && Date.now() < Number(expiry);
  });

  const [isAdmin, setAdmin] = useState(() => localStorage.getItem('isAdmin') === 'false');

  const login = (token, expiryTime, epin) => {
        // if (typeof expiryTime !== 'number' || expiryTime <= 0) {
        //   console.error("Invalid expiry time");
        //   return;
        // }

    localStorage.setItem('token', token);
    localStorage.setItem('expiry', Date.now() + expiryTime * 1000);
    localStorage.setItem('epin', epin);

    if (epin === 'HNG00001') {
      setAdmin(true);
      localStorage.setItem('isAdmin', true);
    }else{   
        setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
    localStorage.removeItem('sponsorId');
    localStorage.removeItem('isAdmin');
  };

//   useEffect(() => {
//     const checkToken = () => {
//       const token = localStorage.getItem('token');
//       const expiry = localStorage.getItem('expiry');

//       if (!token || !expiry || Date.now() > Number(expiry)) {
//         logout();
//       }
//     };

//     checkToken();
//     const interval = setInterval(checkToken, 1000 * 60);

//     return () => clearInterval(interval);
//   }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
