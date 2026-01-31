
import React, { useState } from 'react';
import { Batch, Lead, LeadStatus } from '../types';

const initialBatches: Batch[] = [
  { id: 'B-IIT-01', name: 'JEE Advance Star', course: 'IIT JEE', teacherName: 'Prof. V.K. Singh', studentCount: 45, mode: 'Offline', investmentCost: 250000 },
  { id: 'B-NEET-02', name: 'NEET Dropper Excellence', course: 'NEET', teacherName: 'Dr. Neha Sharma', studentCount: 128, mode: 'Online', investmentCost: 180000 },
  { id: 'B-NDA-03', name: 'NDA Alpha Squad', course: 'NDA', teacherName: 'Major Amit', studentCount: 32, mode: 'Offline', investmentCost: 120000 },
];

const approvedLeads: Partial<Lead>[] = [
  { id: 'L004', name: 'ISHITA KAPOOR', exam: 'NDA', createdAt: '2023-10-27' },
  { id: 'L009', name: 'RAHUL VERMA', exam: 'IIT', createdAt: '2023-10-28' },
];

export const EnrollmentView: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>(initialBatches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBatch, setNewBatch] = useState<Partial<Batch>>({
    name: '', course: 'IIT JEE', teacherName: '', studentCount: 0, mode: 'Offline', investmentCost: 0
  });

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `B-NEW-${Math.floor(Math.random() * 1000)}`;
    setBatches([...batches, { ...newBatch, id } as Batch]);
    setIsModalOpen(false);
    setNewBatch({ name: '', course: 'IIT JEE', teacherName: '', studentCount: 0, mode: 'Offline', investmentCost: 0 });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Approved Leads to Convert */}
        <div className="lg:col-span-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Leads for Conversion</h3>
            <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black">{approvedLeads.length} APPROVED</span>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
            {approvedLeads.map(lead => (
              <div key={lead.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-400 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <p className="font-black text-[11px] text-slate-800 uppercase tracking-tight">{lead.name}</p>
                  <span className="text-[9px] font-black text-blue-600">{lead.exam}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold text-slate-400">ID: {lead.id}</span>
                  <button className="bg-white text-blue-600 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm">Process Enrollment</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Batch Overview */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Active Learning Batches</h3>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1">Institutional Operations Hub</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0f172a] text-white px-7 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-500/20 hover:bg-black transition-all transform hover:-translate-y-1"
            >
              <i className="fas fa-plus-circle mr-2"></i> Deploy Batch
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {batches.map((batch) => (
              <div key={batch.id} className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">{batch.id}</span>
                    <h4 className="font-black text-slate-800 uppercase text-sm tracking-tight">{batch.name}</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                    batch.mode === 'Online' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  }`}>
                    {batch.mode}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Assigned Expert</span>
                    <span className="text-slate-700">{batch.teacherName}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>Occupancy</span>
                      <span className="text-blue-600">{batch.studentCount} / 150 Students</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${Math.min((batch.studentCount / 150) * 100, 100)}%` }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Batch Revenue</p>
                      <p className="text-sm font-black text-slate-800">₹{(batch.studentCount * 45000 / 100000).toFixed(1)}L</p>
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-all shadow-lg"><i className="fas fa-arrow-right text-xs"></i></button>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-12 -mt-12 pointer-events-none group-hover:bg-blue-50/50 transition-all"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-xl shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-10 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Deploy New Batch</h3>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-2">Course Assignment & Capacity Matrix</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-rose-500 transition-all shadow-sm"><i className="fas fa-times"></i></button>
            </div>
            
            <form onSubmit={handleCreateBatch} className="p-10 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Batch Identifier</label>
                <input required value={newBatch.name} onChange={e => setNewBatch({...newBatch, name: e.target.value})} type="text" className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-6 py-4 text-sm font-black outline-none transition-all placeholder:text-slate-300" placeholder="e.g. JEE ALPHA 2025" />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Course</label>
                  <select value={newBatch.course} onChange={e => setNewBatch({...newBatch, course: e.target.value})} className="w-full appearance-none bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl px-6 py-4 text-sm font-black outline-none transition-all">
                    <option>IIT JEE</option>
                    <option>NEET</option>
                    <option>NDA</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assigned Teacher</label>
                  <input required value={newBatch.teacherName} onChange={e => setNewBatch({...newBatch, teacherName: e.target.value})} type="text" className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl px-6 py-4 text-sm font-black outline-none transition-all" placeholder="Faculty Name" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Setup Investment (₹)</label>
                  <input required value={newBatch.investmentCost} onChange={e => setNewBatch({...newBatch, investmentCost: Number(e.target.value)})} type="number" className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl px-6 py-4 text-sm font-black outline-none transition-all" placeholder="₹ Amount" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Operational Mode</label>
                  <select value={newBatch.mode} onChange={e => setNewBatch({...newBatch, mode: e.target.value as 'Online' | 'Offline'})} className="w-full appearance-none bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl px-6 py-4 text-sm font-black outline-none transition-all">
                    <option>Offline</option>
                    <option>Online</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition-all uppercase tracking-[0.3em] text-[11px] mt-4 transform active:scale-95"> Deploy Batch Pipeline </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
