import React from 'react';
import { FaStar } from 'react-icons/fa';

export const RatingDistribution = ({ distribution = { 5: 80, 4: 45, 3: 15, 2: 5, 1: 2 } }) => {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-3">
      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-heading">
        Rating Distribution
      </h4>
      {[5, 4, 3, 2, 1].map((star) => {
        const count = distribution[star] || 0;
        const percentage = Math.round((count / total) * 100);

        return (
          <div key={star} className="flex items-center gap-3 text-xs">
            <span className="w-6 font-bold text-slate-300 flex items-center gap-1">
              {star} <FaStar className="w-3 h-3 text-accent" />
            </span>
            <div className="flex-1 h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-10 text-right font-medium text-slate-400">{percentage}%</span>
          </div>
        );
      })}
    </div>
  );
};
