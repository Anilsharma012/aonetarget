
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const conversionData = [
  { name: 'FB Ads', leads: 450, conversions: 85, color: '#3b82f6' },
  { name: 'Google Ads', leads: 320, conversions: 42, color: '#ef4444' },
  { name: 'Walk-in', leads: 210, conversions: 110, color: '#10b981' },
  { name: 'Website', leads: 580, conversions: 92, color: '#8b5cf6' },
];

const revenueByExam = [
  { name: 'IIT JEE', value: 45 },
  { name: 'NEET', value: 35 },
  { name: 'NDA', value: 12 },
  { name: 'Foundation', value: 8 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export const Reports: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Institutional Intelligence Reports</h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Lead Conversion & Revenue Performance Metrics</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:bg-black transition-all">
          <i className="fas fa-file-export"></i> Export Annual Audit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Conversion Ratio Chart */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-10 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 ring-4 ring-blue-50"></span>
            Lead Conversion Ratio by Source
          </h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="conversions" radius={[0, 10, 10, 0]} barSize={24}>
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-10 flex items-center">
            <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3 ring-4 ring-emerald-50"></span>
            Revenue Share by Examination
          </h4>
          <div className="h-80 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueByExam} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {revenueByExam.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none'}} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 pr-10">
              {revenueByExam.map((e, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight w-20">{e.name}</span>
                  <span className="text-xs font-black text-slate-800">{e.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Staff Performance Matrix */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-10 border-b border-slate-50 bg-slate-50/20">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Staff Accountability & Conversion Matrix</h4>
        </div>
        <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { name: 'Sonia Sharma', role: 'Counselor', conversion: '32%', trend: 'up' },
            { name: 'Ramesh Kumar', role: 'Senior Admin', conversion: '45%', trend: 'up' },
            { name: 'Amit Bajaj', role: 'Academic Staff', conversion: '18%', trend: 'down' },
          ].map((staff, i) => (
            <div key={i} className="flex items-center gap-5 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-300 text-xl border border-slate-200 group-hover:border-blue-400">
                <i className="fas fa-user-tie group-hover:text-blue-500 transition-colors"></i>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{staff.role}</p>
                <h5 className="text-sm font-black text-slate-800 uppercase tracking-tight">{staff.name}</h5>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-black text-slate-900">{staff.conversion} Conv.</span>
                  <i className={`fas ${staff.trend === 'up' ? 'fa-arrow-up text-emerald-500' : 'fa-arrow-down text-rose-500'} text-[10px]`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
