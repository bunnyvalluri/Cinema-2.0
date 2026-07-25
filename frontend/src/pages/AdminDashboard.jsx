import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminStats } from '../components/admin/AdminStats';
import { GrowthLineChart, GenreBarChart } from '../components/admin/ChartCard';
import { Badge } from '../components/common/Badge';
import { FiShield, FiUsers, FiFlag, FiActivity, FiSearch, FiCheck, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [userSearch, setUserSearch] = useState('');

  const initialUsers = [
    { id: 'usr_1', name: 'Alex Rivers', email: 'admin@cinemaelk.com', role: 'administrator', status: 'Active', joined: '2024-01-15' },
    { id: 'usr_2', name: 'Sarah Jenkins', email: 'sarah@example.com', role: 'moderator', status: 'Active', joined: '2024-02-10' },
    { id: 'usr_3', name: 'David Kim', email: 'david@example.com', role: 'user', status: 'Active', joined: '2024-03-01' },
    { id: 'usr_4', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'Flagged', joined: '2024-03-12' },
  ];

  const [usersList, setUsersList] = useState(initialUsers);

  const reports = [
    { id: 'rep_1', targetType: 'Review', title: 'Spam / Promo text in review', reporter: 'User #942', status: 'Pending' },
    { id: 'rep_2', targetType: 'Comment', title: 'Inappropriate language', reporter: 'User #108', status: 'Reviewed' },
  ];

  const handleRoleChange = (userId, newRole) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    toast.success(`User role updated to ${newRole}`);
  };

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-100 flex items-center gap-3">
            <FiShield className="text-accent flex-shrink-0" /> Enterprise Admin Console
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            System administration, RBAC controls, platform analytics, and moderation logs.
          </p>
        </div>
        <div className="self-start sm:self-auto">
          <Badge variant="accent" size="md">
            Administrator Mode
          </Badge>
        </div>
      </div>

      {/* Metrics Row */}
      <AdminStats />

      {/* Chart Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <GrowthLineChart />
        <GenreBarChart />
      </div>

      {/* User Management Section */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-sm sm:text-base font-bold font-heading text-slate-100 flex items-center gap-2">
            <FiUsers className="text-primary" /> User Accounts & Role Authorization (RBAC)
          </h3>
          <input
            type="text"
            placeholder="Filter users..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="bg-slate-900 text-xs px-3.5 py-2 rounded-xl border border-slate-700 w-full sm:w-64 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300 min-w-[640px]">
            <thead className="bg-slate-900/90 uppercase text-[10px] text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="p-3">User Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Current Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Joined Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-dark-card/40">
              {filteredUsers.map((usr) => (
                <tr key={usr.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-100">{usr.name}</td>
                  <td className="p-3 text-slate-300">{usr.email}</td>
                  <td className="p-3">
                    <select
                      value={usr.role}
                      onChange={(e) => handleRoleChange(usr.id, e.target.value)}
                      className="bg-slate-800 text-slate-200 text-xs px-2.5 py-1 rounded-lg border border-slate-700 focus:outline-none"
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="administrator">Administrator</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        usr.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {usr.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{usr.joined}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => toast.success(`Account settings for ${usr.name} updated`)}
                      className="p-1.5 text-slate-400 hover:text-primary transition-colors"
                      title="Confirm Changes"
                    >
                      <FiCheck className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reports & Moderation Section */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 space-y-4">
        <h3 className="text-sm sm:text-base font-bold font-heading text-slate-100 flex items-center gap-2">
          <FiFlag className="text-rose-500" /> Flagged Content & Moderation Reports
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((rep) => (
            <div key={rep.id} className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  {rep.targetType}
                </span>
                <h4 className="text-xs font-bold text-slate-200 mt-1.5">{rep.title}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Reported by {rep.reporter}</p>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => toast.success('Report resolved')}
                  className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-[11px] font-bold rounded-xl border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition-all"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => toast.error('Content removed')}
                  className="p-2 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-all"
                  title="Remove Content"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
