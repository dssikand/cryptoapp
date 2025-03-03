import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetAuthToken, SetAuthToken } from './utils/common';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await GetAuthToken();
        console.log(token)
        setIsLoggedIn(token == null ? false : true);
      } catch (error) {
        console.error('Error fetching auth token:', error);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (token) => {
    await SetAuthToken(token)
    setIsLoggedIn(true); // ✅ Immediately update state after login
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false); // ✅ Update state after logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
