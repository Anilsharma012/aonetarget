
import React from 'react';

const mockOnlineBatches = [
  { id: 'OB-01', name: 'IIT JEE Morning Star', students: 42, timing: '08:00 AM - 11:00 AM', status: 'Live Now' },
  { id: 'OB-02', name: 'NEET Excellence 2.0', students: 128, timing: '02:00 PM - 05:00 PM', status: 'Upcoming' },
  { id: 'OB-03', name: 'Foundation Class X', students: 85, timing: '06:00 PM - 08:00 PM', status: 'Scheduled' },
];

export const OnlineBatches: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Virtual Campus Management</h2>
            <p className="text-blue-100 font-medium opacity-90">Coordinating live digital batches for JEE & NEET across India</p>
          </div>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg hover:scale-105 transition-transform">
            Launch Live Session
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOnlineBatches.map((batch) => (
          <div key={batch.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                  batch.status === 'Live Now' ? 'bg-red-100 text-red-600 border-red-200 animate-pulse' : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  {batch.status}
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">ID: {batch.id}</span>
              </div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight leading-tight mb-2">{batch.name}</h3>
              <div className="flex items-center space-x-2 text-slate-500 text-xs font-bold mb-4">
                <i className="far fa-clock"></i>
                <span>{batch.timing}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Stream</p>
                <p className="text-sm font-black text-slate-700">{batch.students} Students</p>
              </div>
              <button className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                <i className="fas fa-video"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
