import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn, signUp } from "../api/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const data = await signIn(email, password);
      await AsyncStorage.setItem("authToken", data.token);
      setUser(data.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const data = await signUp(email, password);
      await AsyncStorage.setItem("authToken", data.token);
      setUser(data.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
