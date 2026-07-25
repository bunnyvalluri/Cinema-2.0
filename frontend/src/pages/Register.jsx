import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiFilm, FiUser, FiMail, FiLock } from 'react-icons/fi';

export const Register = () => {
  const { register: registerField, handleSubmit, formState: { errors } } = useForm();
  const { register: authRegister, loading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await authRegister(data.name, data.email, data.password);
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
          <h2 className="text-2xl font-extrabold font-heading text-slate-100">Create Account</h2>
          <p className="text-xs text-slate-400">Join the Cinema Elk film critic community today.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Alex Rivers"
                {...registerField('name', { required: 'Name is required' })}
                className="w-full bg-slate-900 text-slate-100 text-sm pl-10 pr-4 py-3 rounded-2xl border border-slate-700/60 focus:border-primary focus:outline-none"
              />
              <FiUser className="absolute left-3.5 top-3.5 text-slate-500 w-4 h-4" />
            </div>
            {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="alex@cinemaelk.com"
                {...registerField('email', { required: 'Email is required' })}
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
                {...registerField('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                className="w-full bg-slate-900 text-slate-100 text-sm pl-10 pr-4 py-3 rounded-2xl border border-slate-700/60 focus:border-primary focus:outline-none"
              />
              <FiLock className="absolute left-3.5 top-3.5 text-slate-500 w-4 h-4" />
            </div>
            {errors.password && <p className="text-[11px] text-rose-400 mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary text-white font-bold text-sm rounded-2xl shadow-glow-primary hover:bg-primary-hover transition-all"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-xs text-slate-400 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
