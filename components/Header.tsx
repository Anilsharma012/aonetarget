
import React from 'react';

interface HeaderProps {
  activeTab: string;
  role: string | null;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, role }) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Operational Dashboard';
      case 'leads': return 'Leads & CRM';
      case 'staff': return 'Staff Management';
      case 'inventory': return 'Inventory & Investments';
      case 'reports': return 'Financial Reports';
      default: return 'A1 Target';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{getTitle()}</h2>
        <p className="text-sm text-slate-500">Manage your institution efficiently</p>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold uppercase">System Online</span>
          <span className="font-medium">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
        <div className="h-8 w-px bg-slate-200"></div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-800 capitalize">{role}</p>
            <p className="text-xs text-slate-500">Level 1 Authentication</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
            <i className="fas fa-user"></i>
          </div>
        </div>
      </div>
    </header>
  );
};
