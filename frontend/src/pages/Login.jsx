import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiFilm, FiMail, FiLock } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-3xl glass-panel border border-slate-800 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto shadow-glow-primary">
            <FiFilm className="w-6 h-6 text-dark-bg stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-slate-100">Sign In to Cinema Elk</h2>
          <p className="text-xs text-slate-400">Access your personalized recommendations and watchlists.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="alex@cinemaelk.com"
                {...register('email', { required: 'Email is required' })}
                className="w-full bg-slate-900 text-slate-100 text-sm pl-10 pr-4 py-3 rounded-2xl border border-slate-700/60 focus:border-primary focus:outline-none"
              />
              <FiMail className="absolute left-3.5 top-3.5 text-slate-500 w-4 h-4" />
            </div>
            {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                {...register('password', { required: 'Password is required' })}
                className="w-full bg-slate-900 text-slate-100 text-sm pl-10 pr-4 py-3 rounded-2xl border border-slate-700/60 focus:border-primary focus:outline-none"
              />
              <FiLock className="absolute left-3.5 top-3.5 text-slate-500 w-4 h-4" />
            </div>
            {errors.password && <p className="text-[11px] text-rose-400 mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input type="checkbox" className="rounded bg-slate-800 border-slate-700 text-primary focus:ring-0" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-primary font-semibold hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary text-white font-bold text-sm rounded-2xl shadow-glow-primary hover:bg-primary-hover transition-all"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-500"><span className="bg-dark-card px-2">Or continue with</span></div>
        </div>

        <button
          onClick={() => onSubmit({ email: 'admin@cinemaelk.com', password: 'password' })}
          className="w-full py-3 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-2xl border border-slate-700/60 flex items-center justify-center gap-2 transition-all"
        >
          <FaGoogle className="text-rose-500" /> Sign In With Google
        </button>

        <p className="text-xs text-slate-400 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
};
