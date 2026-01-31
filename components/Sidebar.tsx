
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  userRole: 'Admin' | 'Staff' | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, userRole }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
    { id: 'teachers', label: 'Teachers', icon: 'fa-chalkboard-user' },
    { id: 'staff', label: 'Staff Directory', icon: 'fa-user-tie' },
    { id: 'staff-mgmt', label: 'Staff Management', icon: 'fa-users-gear' },
    { id: 'infrastructure', label: 'Infrastructure & Investments', icon: 'fa-building-columns' },
    { id: 'enrollment', label: 'Student Enrollment', icon: 'fa-user-graduate' },
    { id: 'online', label: 'Online Batches', icon: 'fa-laptop-code' },
    { id: 'leads', label: 'Leads (CRM)', icon: 'fa-magnet' },
  ];

  return (
    <div className="w-72 bg-[#0f172a] text-white flex flex-col border-r border-slate-800 shrink-0">
      <div className="p-8 border-b border-slate-800">
        <div className="flex items-center space-x-4">
          <div className="bg-red-600 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-black shadow-xl shadow-red-600/30 transform -rotate-3 border-2 border-white/10">A1</div>
          <div>
            <h1 className="text-xl font-black tracking-tighter leading-none text-white">A1 TARGET</h1>
            <p className="text-[9px] text-slate-500 font-black uppercase mt-1 tracking-[0.2em]">Institute Logic</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-8 overflow-y-auto custom-scrollbar">
        <div className="px-8 py-2 mb-4">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.25em]">Main Navigation</p>
        </div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-4 px-8 py-4 transition-all relative group ${
              activeTab === item.id 
              ? 'bg-blue-600/10 text-blue-400 border-r-4 border-blue-500' 
              : 'text-slate-500 hover:bg-slate-800/30 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icon} w-5 text-center transition-transform group-hover:scale-110 ${activeTab === item.id ? 'text-blue-500' : ''}`}></i>
            <span className="font-bold text-[13px] tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800 bg-slate-900/50">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-3 px-4 py-4 text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 rounded-2xl transition-all border border-rose-500/20 font-black text-[11px] uppercase tracking-widest"
        >
          <i className="fas fa-power-off"></i>
          <span>Secure Logout</span>
        </button>
      </div>
    </div>
  );
};
