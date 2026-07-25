import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFilm, FiMail, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSent(true);
      toast.success('Password reset link sent to your email address.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-3xl glass-panel border border-slate-800 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto shadow-glow-primary">
            <FiFilm className="w-6 h-6 text-dark-bg stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-slate-100">Reset Password</h2>
          <p className="text-xs text-slate-400">Enter your account email to receive a password reset link.</p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="alex@cinemaelk.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-900 text-slate-100 text-sm pl-10 pr-4 py-3 rounded-2xl border border-slate-700/60 focus:border-primary focus:outline-none"
                />
                <FiMail className="absolute left-3.5 top-3.5 text-slate-500 w-4 h-4" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-white font-bold text-sm rounded-2xl shadow-glow-primary hover:bg-primary-hover transition-all"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
            <p className="text-xs font-bold text-emerald-400">Instructions Sent!</p>
            <p className="text-[11px] text-slate-300">Check your inbox for step-by-step password recovery instructions.</p>
          </div>
        )}

        <div className="text-center pt-2">
          <Link to="/login" className="text-xs text-slate-400 hover:text-primary flex items-center justify-center gap-1">
            <FiArrowLeft /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
