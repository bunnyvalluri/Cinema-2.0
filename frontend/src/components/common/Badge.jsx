import React from 'react';

export const Badge = ({ children, variant = 'primary', size = 'sm', className = '' }) => {
  const variants = {
    primary: 'bg-primary/20 text-primary border-primary/30',
    secondary: 'bg-slate-800 text-slate-300 border-slate-700',
    accent: 'bg-accent/20 text-accent border-accent/30',
    success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    danger: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    glass: 'bg-white/10 text-white border-white/20 backdrop-blur-md',
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full border tracking-wide uppercase transition-all ${
        variants[variant] || variants.primary
      } ${sizes[size] || sizes.sm} ${className}`}
    >
      {children}
    </span>
  );
};
