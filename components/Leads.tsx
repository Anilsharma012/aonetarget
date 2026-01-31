
import React, { useState, useMemo } from 'react';
import { LeadStatus, StudentStage, Lead, LeadSource } from '../types';

const staffMembers = [
  { id: 'ST001', name: 'ADMIN (RAMESH)' },
  { id: 'ST002', name: 'STAFF (SONIA)' },
  { id: 'ST003', name: 'AMIT BAJAJ' },
];

const messageTemplates = [
  "Thank you for your inquiry at A1 Target. Our counsellor will contact you shortly.",
  "Your Demo session is scheduled for tomorrow at 4:00 PM.",
  "Greetings from A1 Target. We have reviewed your profile and suggest the Star Batch."
];

const mockLeads: Lead[] = [
  { 
    id: 'L001', name: 'SIDDHARTH ROY', phone: '9876543210', alternatePhone: '9911223344', fatherName: 'Madan Roy', motherName: 'Sita Roy',
    email: 'sidd@gmail.com', address: 'Boring Road, Patna', school: 'DPS Patna', class: 'XII',
    details: 'Interested in IIT JEE 2-year program.', requirements: 'Evening batch.', 
    status: LeadStatus.ACTIVE, studentStage: StudentStage.DEMO_ATTENDED, source: LeadSource.FB_ADS,
    assignedStaffId: 'ST001', lastResponse: 'Will join after demo scheduled for Mon...', lastUpdatedBy: 'ADMIN (RAMESH)', 
    lastUpdatedTime: '2023-10-25 10:30 AM', createdAt: '2023-10-20', exam: 'IIT',
    timeline: [
      { date: '2023-10-20', event: 'Lead Created via FB Ad', staff: 'System' },
      { date: '2023-10-21', event: 'Called by Staff Sonia', staff: 'Sonia' },
      { date: '2023-10-25', event: 'Demo Attended', staff: 'Ramesh' }
    ]
  },
  { 
    id: 'L002', name: 'MEGHA PATEL', phone: '8876543211', fatherName: 'Kunal Patel',
    email: 'megha@patel.com', address: 'Sector 4, Bokaro', school: 'Chinmaya Vidyalaya', class: 'XII Dropper',
    details: 'NEET Dropper student.', requirements: 'Scholarship required.', 
    status: LeadStatus.PENDING, studentStage: StudentStage.ENQUIRY, source: LeadSource.WALK_IN,
    assignedStaffId: 'ST002', lastResponse: 'Awaiting parent confirmation on fees.', lastUpdatedBy: 'STAFF (SONIA)', 
    lastUpdatedTime: '2023-10-26 02:15 PM', createdAt: '2023-10-25', exam: 'NEET',
    timeline: [
      { date: '2023-10-25', event: 'Walk-in Enquiry', staff: 'Sonia' },
      { date: '2023-10-26', event: 'Fee discussion done', staff: 'Sonia' }
    ]
  },
  { 
    id: 'L003', name: 'KARAN MALHOTRA', phone: '7876543212', 
    details: 'Class XII regular support.', requirements: 'Weekend Physics & Math only.', 
    status: LeadStatus.REJECTED, studentStage: StudentStage.ENQUIRY, source: LeadSource.GOOGLE_ADS,
    assignedStaffId: 'ST001', lastResponse: 'Fees too high.', lastUpdatedBy: 'ADMIN (RAMESH)', 
    lastUpdatedTime: '2023-10-27 11:00 AM', createdAt: '2023-10-26', exam: 'JEE',
    timeline: [{ date: '2023-10-26', event: 'Lead via Google Search', staff: 'System' }]
  },
  { 
    id: 'L004', name: 'ISHITA KAPOOR', phone: '6876543213', 
    details: 'Foundation course for Class X.', requirements: 'Online mode only.', 
    status: LeadStatus.APPROVED, studentStage: StudentStage.ENROLLED, source: LeadSource.WEBSITE,
    assignedStaffId: 'ST002', lastResponse: 'Ready for enrollment.', lastUpdatedBy: 'STAFF (SONIA)', 
    lastUpdatedTime: '2023-10-28 04:50 PM', createdAt: '2023-10-27', exam: 'NDA',
    timeline: [
      { date: '2023-10-27', event: 'Website Form Submission', staff: 'System' },
      { date: '2023-10-28', event: 'Enrolled in Batch Alpha', staff: 'Sonia' }
    ]
  },
];

export const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [examFilter, setExamFilter] = useState<string>('ALL');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [currentLeadForLog, setCurrentLeadForLog] = useState<Lead | null>(null);
  const [logMessage, setLogMessage] = useState('');
  const [autoResponse, setAutoResponse] = useState(true);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           lead.phone.includes(searchTerm) || lead.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
      const matchesExam = examFilter === 'ALL' || lead.exam.toUpperCase() === examFilter;
      return matchesSearch && matchesStatus && matchesExam;
    });
  }, [leads, searchTerm, statusFilter, examFilter]);

  const handleUpdateLeadField = (id: string, field: keyof Lead, value: any) => {
    setLeads(prev => prev.map(l => l.id === id ? { 
      ...l, 
      [field]: value,
      lastUpdatedTime: new Date().toLocaleString(),
      lastUpdatedBy: 'ADMIN (SYSTEM)'
    } : l));
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Search and Filters Section */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 px-2">
        <div className="flex flex-wrap items-end gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Search Lead</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Name, Phone or ID..."
                className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm w-full md:w-72 focus:ring-4 focus:ring-blue-500/10 outline-none shadow-sm transition-all text-slate-600 placeholder:text-slate-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status Filter</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-2xl px-5 py-3 text-xs font-bold uppercase text-slate-500 outline-none focus:ring-4 focus:ring-blue-500/10 min-w-[160px] shadow-sm"
            >
              <option value="ALL">All Statuses</option>
              {Object.values(LeadStatus).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-3 px-5 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Auto Response</span>
            <button 
              onClick={() => setAutoResponse(!autoResponse)}
              className={`w-10 h-5 rounded-full relative transition-all ${autoResponse ? 'bg-emerald-500' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${autoResponse ? 'right-0.5' : 'left-0.5'}`}></div>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-[#0f172a] text-white px-7 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] flex items-center shadow-lg hover:bg-black transition-all transform active:scale-95">
            <i className="fas fa-file-csv mr-2.5 text-xs"></i> Bulk Import
          </button>
          <button className="bg-[#10b981] text-white px-7 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] flex items-center shadow-lg hover:bg-[#059669] transition-all transform active:scale-95">
            <i className="fab fa-whatsapp mr-2.5 text-sm"></i> Broadcast
          </button>
        </div>
      </div>

      {/* Main CRM Table */}
      <div className="bg-white rounded-[1.5rem] shadow-2xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1300px]">
            <thead>
              <tr className="bg-white border-b border-slate-50">
                <th className="px-6 py-7 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest w-16 text-center">S.No</th>
                <th className="px-6 py-7 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">Candidate</th>
                <th className="px-6 py-7 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">Contact</th>
                <th className="px-6 py-7 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">Lead Status</th>
                <th className="px-6 py-7 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">Student Stage</th>
                <th className="px-6 py-7 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">Last Updated By</th>
                <th className="px-6 py-7 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">Recent Conversation</th>
                <th className="px-6 py-7 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLeads.map((lead, index) => (
                <tr 
                  key={lead.id} 
                  onClick={() => setSelectedLead(lead)}
                  className="hover:bg-slate-50/40 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-6 text-center text-[11px] font-bold text-slate-300">{index + 1}</td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-700 uppercase text-[11px] tracking-tight">{lead.name}</span>
                      <span className="text-[10px] text-slate-400 font-bold tracking-tight mt-1">ID: {lead.id} | {lead.exam}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] font-black text-slate-600">{lead.phone}</span>
                      <a href={`https://wa.me/${lead.phone}`} target="_blank" onClick={e => e.stopPropagation()} className="w-7 h-7 flex items-center justify-center bg-[#f0fdf4] text-[#22c55e] rounded-lg shadow-sm border border-[#dcfce7] hover:bg-[#22c55e] hover:text-white transition-all transform hover:scale-105">
                        <i className="fab fa-whatsapp text-sm"></i>
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-6" onClick={e => e.stopPropagation()}>
                    <select
                      value={lead.status}
                      onChange={(e) => handleUpdateLeadField(lead.id, 'status', e.target.value as LeadStatus)}
                      className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border outline-none w-full text-center transition-all ${
                        lead.status === LeadStatus.ACTIVE ? 'bg-[#eff6ff] text-[#1d4ed8] border-[#dbeafe]' :
                        lead.status === LeadStatus.REJECTED ? 'bg-[#fef2f2] text-[#b91c1c] border-[#fee2e2]' :
                        'bg-slate-50 text-slate-500 border-slate-100'
                      }`}
                    >
                      {Object.values(LeadStatus).map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-6" onClick={e => e.stopPropagation()}>
                    <select
                      value={lead.studentStage}
                      onChange={(e) => handleUpdateLeadField(lead.id, 'studentStage', e.target.value as StudentStage)}
                      className="text-[10px] font-black uppercase px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-500 outline-none w-full shadow-sm"
                    >
                      {Object.values(StudentStage).map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight">{lead.lastUpdatedBy}</span>
                      <span className="text-[9px] text-slate-400 font-bold mt-1">{lead.lastUpdatedTime}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="text-[10px] text-slate-400 italic font-medium max-w-[180px] truncate flex items-center">
                      <i className="fas fa-comment-dots mr-2 text-slate-200"></i>
                      {lead.lastResponse || 'No logs yet...'}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right" onClick={e => e.stopPropagation()}>
                    <button 
                      onClick={() => { setCurrentLeadForLog(lead); setIsLogModalOpen(true); }}
                      className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-blue-600 bg-white hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100"
                    >
                      <i className="fas fa-pen-to-square text-[13px]"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side Dossier Panel */}
      {selectedLead && (
        <div className="fixed inset-y-0 right-0 w-[480px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-100">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 bg-red-600 rounded-[1.25rem] flex items-center justify-center text-white text-2xl shadow-xl shadow-red-500/20 transform -rotate-3 border-2 border-white/10">
                <i className="fas fa-user-graduate"></i>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">{selectedLead.name}</h3>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2 block">{selectedLead.id} • {selectedLead.exam}</span>
              </div>
            </div>
            <button onClick={() => setSelectedLead(null)} className="w-12 h-12 rounded-full bg-slate-50 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all flex items-center justify-center shadow-sm">
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
            {/* Quick Actions */}
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all transform active:scale-95"><i className="fab fa-whatsapp mr-2 text-sm"></i> WhatsApp</button>
              <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all transform active:scale-95"><i className="fas fa-phone-alt mr-2 text-sm"></i> Call</button>
            </div>

            {/* Student Detail Panel Section */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center">
                <i className="fas fa-info-circle mr-2 text-blue-500"></i> Dossier Information
              </h4>
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Father's Name</p>
                  <p className="text-xs font-black text-slate-700 uppercase">{selectedLead.fatherName || 'Not Listed'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Target Exam</p>
                  <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{selectedLead.exam}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Contact (Primary)</p>
                  <p className="text-xs font-black text-slate-700 font-mono">{selectedLead.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Lead Source</p>
                  <span className="text-[9px] font-black text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded uppercase">{selectedLead.source.replace('_', ' ')}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-200/50">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Residential Address</p>
                  <p className="text-xs font-medium text-slate-600">{selectedLead.address || 'Address details unavailable'}</p>
                </div>
              </div>
            </div>

            {/* Lead History (Timeline) */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center">
                <i className="fas fa-history mr-2 text-amber-500"></i> Event Timeline
              </h4>
              <div className="space-y-6 relative ml-3">
                <div className="absolute left-[-11px] top-1 bottom-1 w-[2px] bg-slate-100"></div>
                {selectedLead.timeline.map((t, i) => (
                  <div key={i} className="relative flex flex-col space-y-2 group">
                    <div className="absolute left-[-15px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white ring-4 ring-blue-50 shadow-sm transition-transform group-hover:scale-125"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight">{t.event}</span>
                      <span className="text-[9px] font-bold text-slate-400">{t.date}</span>
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded inline-block w-fit">Staff: {t.staff}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex gap-4">
            <button className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-black transition-all uppercase tracking-[0.2em] text-[10px] active:scale-95">Enroll to Batch</button>
            <button className="w-14 h-14 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-rose-500 transition-all flex items-center justify-center shadow-sm"><i className="fas fa-trash-can"></i></button>
          </div>
        </div>
      )}

      {/* Log Update Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-center z-[60] p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Manual Remark Add</h3>
              <button onClick={() => setIsLogModalOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors"><i className="fas fa-times text-xl"></i></button>
            </div>
            <div className="p-8 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pre-defined Templates</label>
                <div className="flex flex-wrap gap-2">
                  {messageTemplates.map((tmp, i) => (
                    <button 
                      key={i} 
                      onClick={() => setLogMessage(tmp)}
                      className="text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                    >T{i+1}</button>
                  ))}
                </div>
              </div>
              <textarea 
                className="w-full h-40 p-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-300"
                placeholder="Staff Name Tagged automatically. Summarize conversation..."
                value={logMessage}
                onChange={e => setLogMessage(e.target.value)}
              />
              <button 
                onClick={() => {
                  if (currentLeadForLog) {
                    const newTimelineEntry = { date: new Date().toISOString().split('T')[0], event: 'Remark Added', staff: 'Admin' };
                    setLeads(prev => prev.map(l => l.id === currentLeadForLog.id ? { 
                      ...l, 
                      lastResponse: logMessage, 
                      timeline: [...l.timeline, newTimelineEntry],
                      lastUpdatedTime: new Date().toLocaleString()
                    } : l));
                    setIsLogModalOpen(false);
                    setLogMessage('');
                  }
                }}
                className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl uppercase tracking-[0.2em] text-[11px] active:scale-95"
              >Submit Ledger Entry</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
