import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingColleges, setPendingColleges] = useState([
    { id: 1, name: 'New Engineering College', location: 'Pune', owner: 'Rajesh Kumar', appliedDate: '2024-01-10', type: 'Engineering' },
    { id: 2, name: 'Business School of India', location: 'Bangalore', owner: 'Priya Sharma', appliedDate: '2024-01-12', type: 'Management' },
    { id: 3, name: 'Institute of Design', location: 'Mumbai', owner: 'Amit Verma', appliedDate: '2024-01-15', type: 'Design' },
  ]);
  
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joinedDate: '2024-01-01', reviews: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', joinedDate: '2024-01-05', reviews: 12 },
    { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', joinedDate: '2024-01-01', reviews: 0 },
    { id: 4, name: 'Blocked User', email: 'blocked@example.com', role: 'user', status: 'blocked', joinedDate: '2024-01-08', reviews: 2 },
  ]);

  const approveCollege = (id) => {
    setPendingColleges(pendingColleges.filter(c => c.id !== id));
    alert('✅ College approved successfully!');
  };

  const rejectCollege = (id) => {
    setPendingColleges(pendingColleges.filter(c => c.id !== id));
    alert('❌ College rejected!');
  };

  const updateUserStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u));
    const user = users.find(u => u.id === id);
    alert(`👤 User ${user.status === 'active' ? 'blocked' : 'unblocked'} successfully!`);
  };

  const stats = [
    { label: 'Total Colleges', value: '150+', icon: '🏛️', color: 'from-blue-400 to-blue-600' },
    { label: 'Pending Approvals', value: pendingColleges.length, icon: '⏳', color: 'from-yellow-400 to-yellow-600' },
    { label: 'Total Users', value: users.length, icon: '👥', color: 'from-green-400 to-green-600' },
    { label: 'Total Reviews', value: '1,234', icon: '⭐', color: 'from-purple-400 to-purple-600' },
  ];

  return (
    <div 
      className="min-h-screen py-8"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >

      <div className="absolute inset-0 bg-black/40 fixed"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        
        /* Admin Header */
        <div className="backdrop-blur-md bg-white/15 rounded-2xl p-6 mb-8 border border-white/30 shadow-xl">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-white/80 text-sm mt-1">Manage colleges, users, and reviews</p>
            </div>
            <button 
              onClick={() => navigate('/')} 
              className="px-5 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-white text-sm font-medium transition backdrop-blur-sm border border-white/30"
            >
              View Website →
            </button>
          </div>
        </div>

        /* Stats Cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="backdrop-blur-md bg-white/15 rounded-2xl p-5 border border-white/30 hover:bg-white/25 transition shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className="text-4xl">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 backdrop-blur-md ${
              activeTab === 'pending' 
                ? 'bg-white/30 text-white border border-white/40 shadow-lg' 
                : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'
            }`}
          >
            📋 Pending Institutions
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 backdrop-blur-md ${
              activeTab === 'users' 
                ? 'bg-white/30 text-white border border-white/40 shadow-lg' 
                : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'
            }`}
          >
            👥 Manage Users
          </button>
        </div>

        /* Pending Institutions */
        {activeTab === 'pending' && (
          <div className="backdrop-blur-md bg-white/15 rounded-2xl overflow-hidden border border-white/30 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/20 border-b border-white/20">
                    <th className="px-6 py-4 text-left text-white/90 text-xs font-semibold uppercase tracking-wider">College Name</th>
                    <th className="px-6 py-4 text-left text-white/90 text-xs font-semibold uppercase tracking-wider">Location</th>
                    <th className="px-6 py-4 text-left text-white/90 text-xs font-semibold uppercase tracking-wider">Submitted By</th>
                    <th className="px-6 py-4 text-left text-white/90 text-xs font-semibold uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-white/90 text-xs font-semibold uppercase tracking-wider">Applied Date</th>
                    <th className="px-6 py-4 text-left text-white/90 text-xs font-semibold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {pendingColleges.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-white/50">
                        🎉 No pending approvals! Everything is up to date.
                      </td>
                    </tr>
                  ) : (
                    pendingColleges.map((college) => (
                      <tr key={college.id} className="hover:bg-white/10 transition">
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{college.name}</div>
                        </td>
                        <td className="px-6 py-4 text-white/70 text-sm">{college.location}</td>
                        <td className="px-6 py-4 text-white/70 text-sm">{college.owner}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-white/20 text-white/90 rounded-full text-xs font-medium">
                            {college.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/60 text-sm">{college.appliedDate}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => approveCollege(college.id)}
                              className="px-4 py-1.5 bg-emerald-500/70 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition backdrop-blur-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectCollege(college.id)}
                              className="px-4 py-1.5 bg-rose-500/70 hover:bg-rose-500 text-white rounded-lg text-sm font-medium transition backdrop-blur-sm"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        /* Manage Users Tab  */
        {activeTab === 'users' && (
          <div className="backdrop-blur-md bg-white/15 rounded-2xl overflow-hidden border border-white/30 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/20 border-b border-white/20">
                    <th className="px-6 py-4 text-left text-white/90 text-xs font-semibold uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-white/90 text-xs font-semibold uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-white/90 text-xs font-semibold uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-white/90 text-xs font-semibold uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-white/90 text-xs font-semibold uppercase tracking-wider">Reviews</th>
                    <th className="px-6 py-4 text-left text-white/90 text-xs font-semibold uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-4 text-left text-white/90 text-xs font-semibold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-white/10 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-medium text-white">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white/70 text-sm">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' ? 'bg-purple-500/50 text-white' : 'bg-white/20 text-white/80'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-emerald-500/50 text-white' : 'bg-rose-500/50 text-white'
                        }`}>
                          {user.status === 'active' ? '🟢 Active' : '🔴 Blocked'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/70 text-sm">⭐ {user.reviews}</td>
                      <td className="px-6 py-4 text-white/60 text-sm">{user.joinedDate}</td>
                      <td className="px-6 py-4">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => updateUserStatus(user.id)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                              user.status === 'active' 
                                ? 'bg-amber-500/70 hover:bg-amber-500 text-white' 
                                : 'bg-emerald-500/70 hover:bg-emerald-500 text-white'
                            }`}
                          >
                            {user.status === 'active' ? 'Block' : 'Unblock'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;