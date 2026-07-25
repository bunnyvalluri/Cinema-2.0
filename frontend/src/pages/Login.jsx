import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiFilm,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiStar,
  FiCheckCircle,
  FiArrowRight,
  FiUserCheck,
} from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';

export const Login = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { login, loginWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Signed in successfully! Welcome back.');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Authentication failed. Please check credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuickDemoAdmin = () => {
    setValue('email', 'admin@cinemaelk.com');
    setValue('password', 'password');
    onSubmit({ email: 'admin@cinemaelk.com', password: 'password' });
  };

  const handleQuickDemoCritic = () => {
    setValue('email', 'sarah@example.com');
    setValue('password', 'password');
    onSubmit({ email: 'sarah@example.com', password: 'password' });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-5xl rounded-3xl glass-panel-elevated border border-slate-800 shadow-spotlight overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Cinematic Showcase (Desktop) */}
        <div className="hidden lg:flex relative flex-col justify-between p-10 bg-gradient-to-br from-dark-bg via-slate-900 to-primary/20 overflow-hidden">
          {/* Background Backdrop Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />

          {/* Top Brand Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-primary">
              <FiFilm className="w-5 h-5 text-dark-bg stroke-[2.5]" />
            </div>
            <span className="text-xl font-extrabold font-heading text-white tracking-wider">
              CINEMA<span className="text-primary">ELK</span> <span className="text-xs text-accent">2.0</span>
            </span>
          </div>

          {/* Center Showcase Content */}
          <div className="relative z-10 space-y-4 my-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 text-xs font-bold">
              <FiStar className="fill-accent w-3.5 h-3.5" /> #1 FILM DISCOVERY PLATFORM
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight text-glow">
              Explore 50,000+ Movies & Critic Reviews
            </h2>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Join thousands of film enthusiasts. Save custom watchlists, write verified critic reviews, and watch high-resolution 4K movie trailers.
            </p>

            {/* Feature Checkmarks */}
            <div className="space-y-2 pt-2 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-primary w-4 h-4" /> Personalized AI Movie Recommendations
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-accent w-4 h-4" /> Integrated Community Critic Ratings
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-400 w-4 h-4" /> Real-time Firebase Auth & TMDB Data
              </div>
            </div>
          </div>

          {/* Bottom Security Footer */}
          <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <FiShield className="text-emerald-400" /> 256-Bit SSL Encrypted
            </span>
            <span>Firebase Security v10</span>
          </div>
        </div>

        {/* Right Side: Sign In Form */}
        <div className="p-6 sm:p-10 flex flex-col justify-center space-y-6 bg-slate-950/60 backdrop-blur-2xl">
          <div className="text-center sm:text-left space-y-2">
            <div className="lg:hidden w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto shadow-glow-primary mb-3">
              <FiFilm className="w-6 h-6 text-dark-bg stroke-[2.5]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-100">Welcome Back</h2>
            <p className="text-xs text-slate-400">Sign in to access your watchlists and critic profile.</p>
          </div>

          {/* 1-Click Fast Login Demo Badges */}
          <div className="space-y-2">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Fast 1-Click Demo Login:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700/80 hover:border-accent transition-all flex items-center justify-center gap-1.5"
              >
                <FiShield className="text-accent" /> Demo Admin
              </button>
              <button
                type="button"
                onClick={handleQuickDemoCritic}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700/80 hover:border-primary transition-all flex items-center justify-center gap-1.5"
              >
                <FiUserCheck className="text-primary" /> Demo Critic
              </button>
            </div>
          </div>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-500">
              <span className="bg-slate-950 px-3">Or enter email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="admin@cinemaelk.com"
                  {...register('email', { required: 'Email address is required' })}
                  className="w-full bg-slate-900 text-slate-100 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl border border-slate-700/80 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-inner"
                />
                <FiMail className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
              </div>
              {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', { required: 'Password is required' })}
                  className="w-full bg-slate-900 text-slate-100 text-xs sm:text-sm pl-10 pr-10 py-3 rounded-2xl border border-slate-700/80 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-inner"
                />
                <FiLock className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] text-rose-400 mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded bg-slate-900 border-slate-700 text-primary focus:ring-0" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-primary font-bold hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-hover text-white font-bold text-xs sm:text-sm rounded-2xl shadow-glow-primary hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              <FiArrowRight className="w-4 h-4" />
            </button>
          </form>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-2xl border border-slate-700/80 flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <FaGoogle className="text-rose-500" /> Sign In With Google SSO
          </button>

          <p className="text-xs text-slate-400 text-center pt-2">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Create One
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
