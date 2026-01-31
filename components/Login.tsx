
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (role: 'Admin' | 'Staff') => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !password) {
      setError('Please enter both ID and Password');
      return;
    }

    // Mock authentication logic: 
    // If ID contains 'admin', grant Admin role. Otherwise, grant Staff role.
    if (userId.toLowerCase().includes('admin')) {
      onLogin('Admin');
    } else {
      onLogin('Staff');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 bg-slate-50 border-b border-slate-200 text-center">
          <div className="w-16 h-16 bg-red-600 text-white font-black text-2xl rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-white">
            A1
          </div>
          <h1 className="text-2xl font-black text-slate-800">A1 TARGET</h1>
          <p className="text-slate-500 font-medium text-sm">Institution Management Suite</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold flex items-center">
              <i className="fas fa-circle-exclamation mr-2"></i> {error}
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">User Identification</label>
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 bg-slate-100 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl text-slate-800 font-medium outline-none transition-all"
                placeholder="Enter ID (Admin or Staff)"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <i className="fas fa-id-badge absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 bg-slate-100 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl text-slate-800 font-medium outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="fas fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5"
          >
            AUTHORIZE ACCESS
          </button>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Demo Credentials</p>
            <div className="flex justify-between text-xs font-medium text-blue-700">
              <span>Admin: <code className="bg-blue-100 px-1 rounded text-blue-900">admin</code></span>
              <span>Staff: <code className="bg-blue-100 px-1 rounded text-blue-900">staff</code></span>
            </div>
          </div>

          <div className="text-center">
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
              Forgotten Credentials?
            </a>
          </div>
        </form>

        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
            Proprietary Software of A1 Target Institute Pvt. Ltd.
          </p>
        </div>
      </div>
    </div>
  );
};
