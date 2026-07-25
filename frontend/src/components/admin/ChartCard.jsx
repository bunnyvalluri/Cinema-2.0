import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const GrowthLineChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Monthly Active Users',
        data: [12000, 19000, 24000, 32000, 38000, 42000, 48250],
        borderColor: '#FF6B35',
        backgroundColor: 'rgba(255, 107, 53, 0.15)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94A3B8' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94A3B8' } },
    },
  };

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
      <h3 className="text-base font-bold text-slate-100 font-heading">Platform User Growth</h3>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export const GenreBarChart = () => {
  const data = {
    labels: ['Action', 'Sci-Fi', 'Drama', 'Horror', 'Comedy', 'Animation'],
    datasets: [
      {
        label: 'Total Views (K)',
        data: [350, 420, 290, 180, 240, 310],
        backgroundColor: ['#FF6B35', '#FACC15', '#10B981', '#EF4444', '#3B82F6', '#8B5CF6'],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#94A3B8' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94A3B8' } },
    },
  };

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
      <h3 className="text-base font-bold text-slate-100 font-heading">Top Popular Genres</h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
