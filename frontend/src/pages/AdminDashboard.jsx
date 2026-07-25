import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { AdminStats } from '../components/admin/AdminStats';
import { GrowthLineChart, GenreBarChart } from '../components/admin/ChartCard';
import { Badge } from '../components/common/Badge';
import {
  FiShield,
  FiUsers,
  FiFlag,
  FiActivity,
  FiSearch,
  FiCheck,
  FiTrash2,
  FiUserPlus,
  FiServer,
  FiCpu,
  FiDatabase,
  FiX,
  FiLock,
  FiAlertTriangle,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [userSearch, setUserSearch] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');

  const initialUsers = [
    { id: 'usr_1', name: 'Alex Rivers', email: 'admin@cinemaelk.com', role: 'administrator', status: 'Active', joined: '2024-01-15' },
    { id: 'usr_2', name: 'Sarah Jenkins', email: 'sarah@example.com', role: 'moderator', status: 'Active', joined: '2024-02-10' },
    { id: 'usr_3', name: 'David Kim', email: 'david@example.com', role: 'user', status: 'Active', joined: '2024-03-01' },
    { id: 'usr_4', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'Flagged', joined: '2024-03-12' },
  ];

  const [usersList, setUsersList] = useState(initialUsers);

  const [reportsList, setReportsList] = useState([
    { id: 'rep_1', targetType: 'Review', title: 'Spam / Promo text in review', reporter: 'User #942', status: 'Pending' },
    { id: 'rep_2', targetType: 'Comment', title: 'Inappropriate language', reporter: 'User #108', status: 'Reviewed' },
  ]);

  const handleRoleChange = (userId, newRole) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    toast.success(`User role updated to ${newRole}`);
  };

  const handleToggleStatus = (userId) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'Active' ? 'Flagged' : 'Active';
          toast.success(`Status for ${u.name} set to ${nextStatus}`);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      toast.error('Please enter name and email.');
      return;
    }
    const newUser = {
      id: 'usr_' + Date.now(),
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      status: 'Active',
      joined: new Date().toISOString().split('T')[0],
    };
    setUsersList((prev) => [newUser, ...prev]);
    setNewUserName('');
    setNewUserEmail('');
    setShowAddUserModal(false);
    toast.success(`User ${newUser.name} added as ${newUser.role}`);
  };

  const handleDismissReport = (repId) => {
    setReportsList((prev) => prev.filter((r) => r.id !== repId));
    toast.success('Report dismissed');
  };

  const handleDeleteReport = (repId) => {
    setReportsList((prev) => prev.filter((r) => r.id !== repId));
    toast.error('Flagged content deleted');
  };

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header Bar */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-elevated border border-slate-800 p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-dark-bg/90 to-primary/10" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="accent" size="sm">
                <FiLock className="w-3.5 h-3.5 mr-1 inline" /> ENTERPRISE RBAC V2.4
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight flex items-center gap-3 text-glow">
              <FiShield className="text-accent flex-shrink-0" /> Enterprise Admin Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-xl">
              System administration, RBAC security controls, real-time platform analytics, and content moderation logs.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-hover text-white text-xs font-bold shadow-glow-primary hover:scale-105 transition-all flex items-center gap-2"
            >
              <FiUserPlus className="w-4 h-4" /> Add User
            </button>
          </div>
        </div>
      </div>

      {/* System Telemetry & Cluster Status Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl glass-panel border border-slate-800 flex items-center gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <FiServer className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Cluster Status</p>
            <p className="font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Online 99.9%
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl glass-panel border border-slate-800 flex items-center gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-primary/20 text-primary border border-primary/30">
            <FiActivity className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">API Gateway</p>
            <p className="font-bold text-slate-100 mt-0.5">42ms Latency</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl glass-panel border border-slate-800 flex items-center gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <FiDatabase className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">DB Queries</p>
            <p className="font-bold text-slate-100 mt-0.5">1,420 qps</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl glass-panel border border-slate-800 flex items-center gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-accent/20 text-accent border border-accent/30">
            <FiCpu className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Memory Usage</p>
            <p className="font-bold text-slate-100 mt-0.5">2.4 / 8 GB (30%)</p>
          </div>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <AdminStats />

      {/* Chart Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <GrowthLineChart />
        <GenreBarChart />
      </div>

      {/* User Management RBAC Table */}
      <div className="p-5 sm:p-6 rounded-3xl glass-panel-elevated border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-heading text-slate-100 flex items-center gap-2">
              <FiUsers className="text-primary" /> User Accounts & Role Authorization (RBAC)
            </h3>
            <p className="text-xs text-slate-400">Manage user privileges, assign roles, or toggle account status.</p>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Filter users by name or email..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="w-full bg-slate-900 text-xs text-slate-100 pl-9 pr-4 py-2.5 rounded-2xl border border-slate-700 focus:outline-none focus:border-primary shadow-inner"
            />
            <FiSearch className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800/80 shadow-md">
          <table className="w-full text-left text-xs text-slate-300 min-w-[680px]">
            <thead className="bg-slate-900/90 uppercase text-[10px] text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="p-3.5">User Name</th>
                <th className="p-3.5">Email Address</th>
                <th className="p-3.5">Current Role</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Joined Date</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-dark-card/40">
              {filteredUsers.map((usr) => (
                <tr key={usr.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-3.5 font-bold text-slate-100 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 text-primary font-bold flex items-center justify-center text-xs border border-primary/30">
                      {usr.name[0]}
                    </div>
                    {usr.name}
                  </td>
                  <td className="p-3.5 text-slate-300 font-mono text-[11px]">{usr.email}</td>
                  <td className="p-3.5">
                    <select
                      value={usr.role}
                      onChange={(e) => handleRoleChange(usr.id, e.target.value)}
                      className="bg-slate-900 text-slate-200 text-xs px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary font-semibold"
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="administrator">Administrator</option>
                    </select>
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => handleToggleStatus(usr.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                        usr.status === 'Active'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-rose-500/20 hover:text-rose-400'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-emerald-500/20 hover:text-emerald-400'
                      }`}
                      title="Click to toggle status"
                    >
                      {usr.status}
                    </button>
                  </td>
                  <td className="p-3.5 text-slate-400">{usr.joined}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => toast.success(`Account privileges confirmed for ${usr.name}`)}
                      className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-primary border border-slate-700 transition-all"
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

      {/* Flagged Content & Moderation Queue */}
      <div className="p-5 sm:p-6 rounded-3xl glass-panel-elevated border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-bold font-heading text-slate-100 flex items-center gap-2">
            <FiFlag className="text-rose-500" /> Flagged Content & Moderation Reports ({reportsList.length})
          </h3>
        </div>

        {reportsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportsList.map((rep) => (
              <div
                key={rep.id}
                className="p-4.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all shadow-md"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {rep.targetType}
                  </span>
                  <h4 className="text-xs font-bold text-slate-200 mt-2">{rep.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Reported by {rep.reporter}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleDismissReport(rep.id)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => handleDeleteReport(rep.id)}
                    className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-all shadow-md"
                    title="Remove Flagged Content"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-400 rounded-2xl bg-slate-900/40 border border-slate-800">
            🟢 Zero flagged reports pending moderation.
          </div>
        )}
      </div>

      {/* Add User Modal Overlay */}
      <AnimatePresence>
        {showAddUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-3xl glass-panel-elevated border border-slate-700 shadow-spotlight space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-heading flex items-center gap-2">
                  <FiUserPlus className="text-primary" /> Provision New Account
                </h3>
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">User Display Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="w-full bg-slate-900 text-xs text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. elena@cinemaelk.com"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="w-full bg-slate-900 text-xs text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">Assigned RBAC Role</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="w-full bg-slate-900 text-xs text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary font-semibold"
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="administrator">Administrator</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddUserModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white text-xs font-bold shadow-glow-primary hover:scale-105 transition-all"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
