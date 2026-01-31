
import React from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const salesData = [
  { name: 'Jan', revenue: 4.2, leads: 120 },
  { name: 'Feb', revenue: 3.8, leads: 98 },
  { name: 'Mar', revenue: 8.5, leads: 340 },
  { name: 'Apr', revenue: 5.4, leads: 210 },
  { name: 'May', revenue: 6.9, leads: 280 },
  { name: 'Jun', revenue: 10.2, leads: 450 },
];

export const Dashboard: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border border-white/5">
        <div className="relative z-10">
          <h2 className="text-4xl font-black tracking-tighter uppercase leading-tight">Institutional Intelligence</h2>
          <p className="text-slate-400 mt-3 font-medium max-w-2xl text-lg">Central control for IIT-JEE & NEET coaching cycles. Track every enquiry from first click to final enrollment.</p>
          <div className="flex flex-wrap gap-4 mt-10">
            <button onClick={() => onNavigate?.('leads')} className="bg-white text-slate-900 px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 flex items-center"><i className="fas fa-plus mr-2.5"></i> Add New Enquiry</button>
            <button onClick={() => onNavigate?.('infrastructure')} className="bg-red-600/90 text-white px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-red-700 border border-red-500/30">Capital Audit</button>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <i className="fas fa-brain text-[20rem] -rotate-12"></i>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Enquiries', value: '4,852', icon: 'fa-users', color: 'text-blue-500', bg: 'bg-blue-500/5' },
          { label: 'Converted Leads', value: '1,240', icon: 'fa-user-check', color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
          { label: 'Active Revenue', value: '₹18.4L', icon: 'fa-indian-rupee-sign', color: 'text-amber-500', bg: 'bg-amber-500/5' },
          { label: 'Pending Follow-ups', value: '42', icon: 'fa-clock', color: 'text-rose-500', bg: 'bg-rose-500/5' }
        ].map((card, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:border-slate-200 transition-all group cursor-default">
            <div className="flex items-center justify-between mb-6">
              <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110 shadow-sm`}>
                <i className={`fas ${card.icon}`}></i>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Real-time</span>
                <span className="text-xs text-emerald-500 font-bold">+12.5%</span>
              </div>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{card.label}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tighter">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-10 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 ring-4 ring-blue-50"></span>
            Monthly Enrollment Funnel (Lakhs)
          </h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} dy={15} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[10, 10, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-10 flex items-center">
            <span className="w-3 h-3 bg-red-600 rounded-full mr-3 ring-4 ring-red-50"></span>
            Lead Generation Velocity
          </h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} dy={15} />
                <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="leads" stroke="#dc2626" strokeWidth={4} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
