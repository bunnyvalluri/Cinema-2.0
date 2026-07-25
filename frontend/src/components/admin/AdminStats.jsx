import React from 'react';
import { FiUsers, FiFilm, FiStar, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';

export const AdminStats = () => {
  const stats = [
    { label: 'Total Platform Users', value: '48,250', change: '+12.4%', icon: FiUsers, color: 'text-primary' },
    { label: 'Indexed Movies', value: '14,890', change: '+5.2%', icon: FiFilm, color: 'text-accent' },
    { label: 'Community Reviews', value: '128,400', change: '+18.9%', icon: FiMessageSquare, color: 'text-emerald-400' },
    { label: 'Average App Rating', value: '4.85 / 5', change: '+0.4%', icon: FiStar, color: 'text-yellow-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="p-6 rounded-3xl glass-panel border border-slate-800 flex items-center justify-between shadow-lg"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</p>
              <h3 className="text-2xl font-extrabold text-slate-100 font-heading">{item.value}</h3>
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <FiTrendingUp className="w-3.5 h-3.5" /> {item.change} <span className="text-slate-500 font-normal">vs last month</span>
              </p>
            </div>
            <div className={`p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 ${item.color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
