import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { MovieDetails } from './pages/MovieDetails';
import { Explore } from './pages/Explore';
import { Watchlist } from './pages/Watchlist';
import { Favorites } from './pages/Favorites';
import { Profile } from './pages/Profile';
import { Community } from './pages/Community';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';

// Protected Admin Route Component
const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MovieProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col justify-between bg-dark-bg text-slate-100 font-sans selection:bg-primary selection:text-white">
              <Navbar />

              <main className="flex-1 pt-24">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/landing" element={<Landing />} />
                  <Route path="/movie/:id" element={<MovieDetails />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/community" element={<Community />} />
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />

              <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 3500,
                  style: {
                    background: '#151C2C',
                    color: '#F8FAFC',
                    border: '1px solid rgba(255, 107, 53, 0.3)',
                    borderRadius: '16px',
                    fontSize: '13px',
                  },
                }}
              />
            </div>
          </BrowserRouter>
        </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
