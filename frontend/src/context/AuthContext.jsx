import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const MOCK_ADMIN_USER = {
  uid: 'admin_usr_001',
  email: 'admin@cinemaelk.com',
  displayName: 'Alex Rivers',
  role: 'administrator',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  bio: 'Lead Film Critic & Platform Administrator.',
  followers: 1240,
  following: 180,
  createdAt: '2024-01-15',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('cinema_elk_user');
    return stored ? JSON.parse(stored) : MOCK_ADMIN_USER; // Default to active session for instant experience
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('cinema_elk_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cinema_elk_user');
      localStorage.removeItem('cinema_elk_token');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Demo authentication simulation
      const loggedUser = {
        uid: 'usr_' + Date.now(),
        email,
        displayName: email.split('@')[0],
        role: email.includes('admin') ? 'administrator' : 'user',
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        bio: 'Avid movie watcher & reviewer.',
        followers: 42,
        following: 15,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUser(loggedUser);
      localStorage.setItem('cinema_elk_token', 'mock_jwt_token_' + Date.now());
      toast.success(`Welcome back, ${loggedUser.displayName}!`);
      return loggedUser;
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const newUser = {
        uid: 'usr_' + Date.now(),
        email,
        displayName: name,
        role: 'user',
        photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
        bio: 'Film enthusiast.',
        followers: 0,
        following: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUser(newUser);
      localStorage.setItem('cinema_elk_token', 'mock_jwt_token_' + Date.now());
      toast.success('Account created successfully!');
      return newUser;
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast.success('Signed out successfully');
  };

  const updateUserProfile = (updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('cinema_elk_user', JSON.stringify(updated));
      return updated;
    });
    toast.success('Profile updated!');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUserProfile,
        isAdmin: user?.role === 'administrator',
        isMod: user?.role === 'moderator' || user?.role === 'administrator',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
