import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiFilm,
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiStar,
  FiCheckCircle,
  FiArrowRight,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export const Register = () => {
  const { register: registerField, handleSubmit, formState: { errors } } = useForm();
  const { register: authRegister, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await authRegister(data.name, data.email, data.password);
      toast.success('Account created successfully! Welcome to Cinema Elk.');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-5xl rounded-3xl glass-panel-elevated border border-slate-800 shadow-spotlight overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Cinematic Showcase (Desktop) */}
        <div className="hidden lg:flex relative flex-col justify-between p-10 bg-gradient-to-br from-dark-bg via-slate-900 to-primary/20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80')`,
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
              <FiStar className="fill-accent w-3.5 h-3.5" /> JOIN THE CRITIC CLUB
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight text-glow">
              Start Your Film Discovery Journey
            </h2>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Create your account to organize personal movie watchlists, rate films, publish community reviews, and get personalized recommendations.
            </p>

            <div className="space-y-2 pt-2 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-primary w-4 h-4" /> Free Lifetime Access to 50k+ Film Catalog
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-accent w-4 h-4" /> Verified Critic Badge & Reputation Points
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-400 w-4 h-4" /> Sync Watchlist Across All Devices
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <FiShield className="text-emerald-400" /> Firebase Auth Security
            </span>
            <span>Privacy First Policy</span>
          </div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="p-6 sm:p-10 flex flex-col justify-center space-y-6 bg-slate-950/60 backdrop-blur-2xl">
          <div className="text-center sm:text-left space-y-2">
            <div className="lg:hidden w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto shadow-glow-primary mb-3">
              <FiFilm className="w-6 h-6 text-dark-bg stroke-[2.5]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-100">Create Account</h2>
            <p className="text-xs text-slate-400">Join Cinema Elk 2.0 in under 30 seconds.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Alex Rivers"
                  {...registerField('name', { required: 'Full name is required' })}
                  className="w-full bg-slate-900 text-slate-100 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl border border-slate-700/80 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-inner"
                />
                <FiUser className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
              </div>
              {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="alex@cinemaelk.com"
                  {...registerField('email', { required: 'Email address is required' })}
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
                  placeholder="Minimum 6 characters"
                  {...registerField('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' },
                  })}
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-hover text-white font-bold text-xs sm:text-sm rounded-2xl shadow-glow-primary hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
              <FiArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-xs text-slate-400 text-center pt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
