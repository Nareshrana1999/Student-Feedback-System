
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always use the latest user data from sfs_users for login
    const savedUser = localStorage.getItem('sfs_user');
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      // Find the latest user data from sfs_users
      const users = JSON.parse(localStorage.getItem('sfs_users') || '[]');
      const latestUser = users.find(u => u.id === userObj.id && u.role === userObj.role);
      if (latestUser) {
        setUser(latestUser);
        localStorage.setItem('sfs_user', JSON.stringify(latestUser));
      } else {
        setUser(userObj);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Always use the latest user data from sfs_users for login
    const users = JSON.parse(localStorage.getItem('sfs_users') || '[]');
    const latestUser = users.find(u => u.id === userData.id && u.role === userData.role);
    if (latestUser) {
      setUser(latestUser);
      localStorage.setItem('sfs_user', JSON.stringify(latestUser));
    } else {
      setUser(userData);
      localStorage.setItem('sfs_user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sfs_user');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('sfs_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
