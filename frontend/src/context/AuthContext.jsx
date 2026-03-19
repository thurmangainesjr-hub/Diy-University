/**
 * DIY UNIVERSITY - Authentication Context
 * Production-ready auth with JWT
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3003';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('diy_token');
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();

      if (data.success) {
        setUser(data.data);
      } else {
        localStorage.removeItem('diy_token');
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      localStorage.removeItem('diy_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('diy_token', data.data.token);
        setUser(data.data.user);
        return { success: true };
      } else {
        setError(data.error || 'Login failed');
        return { success: false, error: data.error };
      }
    } catch (err) {
      setError('Connection error');
      return { success: false, error: 'Connection error' };
    }
  };

  const register = async (name, email, password, partnerOrg = null) => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, partnerOrg })
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('diy_token', data.data.token);
        setUser(data.data.user);
        return { success: true };
      } else {
        setError(data.error || 'Registration failed');
        return { success: false, error: data.error };
      }
    } catch (err) {
      setError('Connection error');
      return { success: false, error: 'Connection error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('diy_token');
    setUser(null);
  };

  const updateProfile = async (updates) => {
    const token = localStorage.getItem('diy_token');
    try {
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      const data = await res.json();

      if (data.success) {
        setUser(data.data);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err) {
      return { success: false, error: 'Update failed' };
    }
  };

  const refreshUser = async () => {
    const token = localStorage.getItem('diy_token');
    if (token) {
      await fetchUser(token);
    }
  };

  // API helper with auth
  const api = async (endpoint, options = {}) => {
    const token = localStorage.getItem('diy_token');
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      }
    };

    const res = await fetch(`${API_BASE}${endpoint}`, config);
    return res.json();
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
    api,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
