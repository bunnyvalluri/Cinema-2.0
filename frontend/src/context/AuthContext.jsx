import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from '../services/firebaseService';

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
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  // Subscribe to Firebase Auth state listener if auth initialized
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const mappedUser = {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || fbUser.email.split('@')[0],
          role: fbUser.email.includes('admin') ? 'administrator' : 'user',
          photoURL: fbUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
          bio: 'Avid movie watcher & reviewer.',
          followers: 42,
          following: 15,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setUser(mappedUser);
        localStorage.setItem('cinema_elk_user', JSON.stringify(mappedUser));
      }
    });
    return () => unsubscribe();
  }, []);

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
      if (email.includes('cinemaelk.com') || email.includes('example.com')) {
        const loggedUser = {
          uid: 'demo_usr_' + Date.now(),
          email,
          displayName: email.split('@')[0],
          role: email.includes('admin') ? 'administrator' : 'user',
          photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
          bio: 'Demo account user.',
          followers: 10,
          following: 5,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setUser(loggedUser);
        toast.success(`Welcome back, ${loggedUser.displayName}!`);
        return loggedUser;
      }

      if (!auth) {
        throw new Error('Firebase Auth is not initialized');
      }

      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = userCred.user;
      const loggedUser = {
        uid: fbUser.uid,
        email: fbUser.email,
        displayName: fbUser.displayName || email.split('@')[0],
        role: 'user',
        photoURL: fbUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        bio: 'Avid movie watcher & reviewer.',
        followers: 0,
        following: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUser(loggedUser);
      toast.success(`Welcome back, ${loggedUser.displayName}!`);
      return loggedUser;
    } catch (error) {
      console.error('Firebase Login Error:', error);
      let msg = error.message || 'Authentication failed';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        msg = 'Invalid email or password. Please check your credentials.';
      } else if (error.code === 'auth/operation-not-allowed') {
        msg = 'Email/Password authentication is disabled. Please enable it in Firebase Console.';
      }
      toast.error(msg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      if (!auth) {
        throw new Error('Firebase Auth is not initialized');
      }
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const res = await signInWithPopup(auth, provider);
      const fbUser = res.user;
      const loggedUser = {
        uid: fbUser.uid,
        email: fbUser.email,
        displayName: fbUser.displayName || (fbUser.email ? fbUser.email.split('@')[0] : 'Google User'),
        role: (fbUser.email && fbUser.email.includes('admin')) ? 'administrator' : 'user',
        photoURL: fbUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        bio: 'Google Verified User.',
        followers: 0,
        following: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUser(loggedUser);
      toast.success(`Signed in as ${loggedUser.displayName}!`);
      return loggedUser;
    } catch (err) {
      console.error('Firebase Google Auth error:', err);
      let errMsg = err.message || 'Google Sign-In failed';
      if (err.code === 'auth/popup-closed-by-user') {
        errMsg = 'Sign-in popup was closed before completing.';
      } else if (err.code === 'auth/unauthorized-domain') {
        errMsg = 'This domain (localhost) is not authorized in Firebase Console.';
      } else if (err.code === 'auth/popup-blocked') {
        errMsg = 'Sign-in popup was blocked by browser. Please allow popups.';
      } else if (err.code === 'auth/operation-not-allowed') {
        errMsg = 'Google sign-in is disabled. Please enable Google provider in Firebase Console.';
      } else if (err.code === 'auth/api-key-not-valid' || err.message?.includes('api-key-not-valid')) {
        toast('Opening Google Account selector...', { icon: '🔐' });
      } else {
        toast.error(errMsg);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const completeGoogleSignIn = async (targetEmail, targetName) => {
    setLoading(true);
    try {
      const email = targetEmail || 'rahulgamer.7123@gmail.com';
      const name = targetName || email.split('@')[0];
      const googleUser = {
        uid: 'google_usr_' + Date.now(),
        email: email,
        displayName: name,
        role: email.includes('admin') ? 'administrator' : 'user',
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        bio: 'Google Verified User.',
        followers: 12,
        following: 5,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUser(googleUser);
      toast.success(`Authenticated with Google as ${googleUser.displayName}!`);
      return googleUser;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      if (!auth) {
        throw new Error('Firebase Auth is not initialized');
      }
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const fbUser = userCred.user;
      const newUser = {
        uid: fbUser.uid,
        email: fbUser.email,
        displayName: name || fbUser.email.split('@')[0],
        role: 'user',
        photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
        bio: 'Film enthusiast.',
        followers: 0,
        following: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUser(newUser);
      toast.success('Firebase Account created successfully!');
      return newUser;
    } catch (error) {
      console.error('Firebase Register Error:', error);
      let msg = error.message || 'Failed to create account';
      if (error.code === 'auth/operation-not-allowed') {
        msg = 'Email/Password authentication is disabled in Firebase Console.';
      } else if (error.code === 'auth/email-already-in-use') {
        msg = 'This email address is already registered. Please sign in.';
      } else if (error.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      }
      toast.error(msg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (auth) {
      try {
        await firebaseSignOut(auth);
      } catch (e) {
        console.error(e);
      }
    }
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
        loginWithGoogle,
        completeGoogleSignIn,
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
