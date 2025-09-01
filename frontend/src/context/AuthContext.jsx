import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as authService from '../services/authService';


const AuthContext = createContext(null);

function decodeJwt(token) {
  try {
    if (!token) return null;
    const [, payload] = token.split('.');
    const parsed = JSON.parse(atob(payload));
    console.log("Decoded JWT payload:", parsed);
    return parsed;
  } catch (e) {
    console.error("JWT decode error:", e);
    return null;
  }
}


export function AuthProvider({ children }) {
const [token, setToken] = useState(() => localStorage.getItem('token'));
const [user, setUser] = useState(() => {
const t = localStorage.getItem('token');
if (!t) return null;
return decodeJwt(t);
});

useEffect(() => {
  if (token) {
    localStorage.setItem('token', token);
    setUser(decodeJwt(token));  
  } else {
    localStorage.removeItem('token');
    setUser(null);
  }
}, [token]);



const login = async (email, password) => {
  try {
    const res = await authService.login(email, password);

    if (!res || !res.token) {
      throw new Error(res?.message || "Login failed: No token received");
    }

    setToken(res.token);
    setUser(decodeJwt(res.token));
    return true;
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
};


const logout = () => {
setToken(null);
setUser(null);
authService.logout();
};


//const isSuperadmin = !!(user && Array.isArray(user.roles) && user.roles.flat(Infinity).includes('superadmin'));
const isSuperadmin = Array.isArray(user?.roles) && user.roles.includes("superadmin");


const value = useMemo(() => ({ token, user, isSuperadmin, login, logout }), [token, user, isSuperadmin]);
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
const ctx = useContext(AuthContext);
if (!ctx) throw new Error('useAuth must be used within AuthProvider');
return ctx;
}