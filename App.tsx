
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Leads } from './components/Leads';
import { StaffManagement } from './components/StaffManagement';
import { Inventory } from './components/Inventory';
import { Teachers } from './components/Teachers';
import { EnrollmentView } from './components/EnrollmentView';
import { OnlineBatches } from './components/OnlineBatches';
import { Login } from './components/Login';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'Admin' | 'Staff' | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const authStatus = localStorage.getItem('isA1Auth');
    const role = localStorage.getItem('a1Role') as 'Admin' | 'Staff';
    if (authStatus === 'true' && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleLogin = (role: 'Admin' | 'Staff') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('isA1Auth', 'true');
    localStorage.setItem('a1Role', role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('isA1Auth');
    localStorage.removeItem('a1Role');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={(tab) => setActiveTab(tab)} />;
      case 'leads': return <Leads />;
      case 'teachers': return <Teachers role={userRole} />;
      case 'staff': return <StaffManagement role={userRole} viewOnly={true} />;
      case 'staff-mgmt': return <StaffManagement role={userRole} />;
      case 'infrastructure': return <Inventory />;
      case 'enrollment': return <EnrollmentView />;
      case 'online': return <OnlineBatches />;
      case 'crm-overview': return (
        <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white text-xl">
              <i className="fas fa-diagram-project"></i>
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">Staffs, Leads, and Management Overview</h2>
              <p className="text-slate-500 text-sm">Comprehensive summary of institutional performance.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency</p>
              <h4 className="text-2xl font-black text-slate-800">84%</h4>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Staff</p>
              <h4 className="text-2xl font-black text-slate-800">12</h4>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conversion Goal</p>
              <h4 className="text-2xl font-black text-slate-800">₹25L</h4>
            </div>
          </div>
        </div>
      );
      default: return <Dashboard onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} userRole={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeTab={activeTab} role={userRole} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
