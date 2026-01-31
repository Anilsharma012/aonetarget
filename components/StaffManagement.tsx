
import React, { useState } from 'react';
import { Staff } from '../types';

const initialStaff: Staff[] = [
  { id: 'ST001', name: 'Dr. Ramesh Kumar', role: 'Admin', email: 'ramesh@a1target.com', department: 'Management', joiningDate: '2020-01-15' },
  { id: 'ST002', name: 'Sonia Sharma', role: 'Staff', email: 'sonia@a1target.com', department: 'Counselling', joiningDate: '2021-03-20' },
  { id: 'ST003', name: 'Amit Bajaj', role: 'Staff', email: 'amit@a1target.com', department: 'Academics', joiningDate: '2022-06-10' },
  { id: 'ST004', name: 'Neha Gupta', role: 'Staff', email: 'neha@a1target.com', department: 'Accounts', joiningDate: '2023-09-01' },
];

interface StaffMgmtProps {
  role: 'Admin' | 'Staff' | null;
  viewOnly?: boolean;
}

export const StaffManagement: React.FC<StaffMgmtProps> = ({ role, viewOnly }) => {
  const [staffList, setStaffList] = useState<Staff[]>(initialStaff);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [newStaff, setNewStaff] = useState<Partial<Staff>>({
    name: '', role: 'Staff', email: '', department: '', joiningDate: new Date().toISOString().split('T')[0]
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `ST-${Math.floor(Math.random() * 10000)}`;
    setStaffList([...staffList, { ...newStaff, id } as Staff]);
    setIsModalOpen(false);
    setNewStaff({ name: '', role: 'Staff', email: '', department: '', joiningDate: new Date().toISOString().split('T')[0] });
  };

  const removeStaff = (id: string) => {
    if (confirm("Delete this staff record permanently?")) {
      setStaffList(staffList.filter(s => s.id !== id));
    }
  };

  const filteredStaff = staffList.filter(staff => {
    const matchesId = staff.id.toLowerCase().includes(searchId.toLowerCase());
    const matchesStartDate = !startDate || staff.joiningDate >= startDate;
    const matchesEndDate = !endDate || staff.joiningDate <= endDate;
    return matchesId && matchesStartDate && matchesEndDate;
  });

  const clearFilters = () => {
    setSearchId('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Filter by Staff ID</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="ID Code..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold uppercase tracking-widest w-full md:w-48 focus:ring-4 focus:ring-blue-500/10 outline-none shadow-sm transition-all"
              />
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Joining Date From</label>
            <input 
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold uppercase tracking-widest w-full md:w-48 focus:ring-4 focus:ring-blue-500/10 outline-none shadow-sm transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Joining Date To</label>
            <input 
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold uppercase tracking-widest w-full md:w-48 focus:ring-4 focus:ring-blue-500/10 outline-none shadow-sm transition-all"
            />
          </div>

          {(searchId || startDate || endDate) && (
            <button 
              onClick={clearFilters}
              className="px-4 py-3 text-rose-500 font-black text-[10px] uppercase tracking-widest hover:text-rose-700 transition-all mb-1"
            >
              <i className="fas fa-filter-circle-xmark mr-2"></i> Clear
            </button>
          )}
        </div>

        {!viewOnly && role === 'Admin' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center"
          >
            <i className="fas fa-user-plus mr-2"></i> Register New Staff
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStaff.length > 0 ? filteredStaff.map((staff) => (
          <div key={staff.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4 border border-slate-100 group-hover:border-blue-400 group-hover:bg-blue-50 transition-all duration-300">
                <i className="fas fa-user-tie text-3xl group-hover:text-blue-600"></i>
              </div>
              <h4 className="font-black text-slate-800 uppercase text-sm tracking-tight">{staff.name}</h4>
              <span className={`mt-2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                staff.role === 'Admin' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-blue-50 text-blue-700 border-blue-100'
              }`}>
                {staff.role}
              </span>
              
              <div className="mt-6 w-full text-[10px] space-y-3 uppercase font-bold text-slate-400 tracking-widest">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span>ID Code</span>
                  <span className="text-slate-900 font-mono font-black">{staff.id}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span>Dept</span>
                  <span className="text-slate-900 font-black">{staff.department}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span>Joined</span>
                  <span className="text-slate-900 font-black">
                    {new Date(staff.joiningDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span>Email</span>
                  <span className="text-slate-600 lowercase truncate max-w-[120px] font-medium">{staff.email}</span>
                </div>
              </div>
              
              {!viewOnly && role === 'Admin' && (
                <div className="mt-6 w-full flex space-x-2">
                  <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-md">
                    Edit
                  </button>
                  <button 
                    onClick={() => removeStaff(staff.id)}
                    className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-red-100 shadow-sm"
                  >
                    <i className="fas fa-trash-can text-sm"></i>
                  </button>
                </div>
              )}
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50/50 rounded-bl-full -mr-12 -mt-12 pointer-events-none group-hover:bg-blue-50/50 transition-all duration-300"></div>
          </div>
        )) : (
          <div className="col-span-full py-16 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-user-slash text-3xl text-slate-200"></i>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No matching staff members found</p>
            <p className="text-[10px] text-slate-300 font-bold uppercase mt-2">Adjust your search ID or date range filters</p>
            <button 
              onClick={clearFilters} 
              className="mt-6 px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-8 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Register New Staff</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Institutional Onboarding Portal</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition-all shadow-sm"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleAddStaff} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Legal Name</label>
                <div className="relative">
                  <input 
                    required 
                    value={newStaff.name} 
                    onChange={e => setNewStaff({...newStaff, name: e.target.value})} 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 outline-none transition-all placeholder:text-slate-300" 
                    placeholder="Enter Staff Name" 
                  />
                  <i className="fas fa-user absolute right-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Level</label>
                  <div className="relative">
                    <select 
                      value={newStaff.role} 
                      onChange={e => setNewStaff({...newStaff, role: e.target.value as any})} 
                      className="w-full appearance-none bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 outline-none transition-all cursor-pointer"
                    >
                      <option value="Staff">Staff Member</option>
                      <option value="Admin">System Admin</option>
                      <option value="Teacher">Subject Teacher</option>
                    </select>
                    <i className="fas fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Department</label>
                  <div className="relative">
                    <input 
                      required 
                      value={newStaff.department} 
                      onChange={e => setNewStaff({...newStaff, department: e.target.value})} 
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 outline-none transition-all placeholder:text-slate-300" 
                      placeholder="e.g. Accounts" 
                    />
                    <i className="fas fa-sitemap absolute right-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Joining Date</label>
                  <input 
                    required 
                    value={newStaff.joiningDate} 
                    onChange={e => setNewStaff({...newStaff, joiningDate: e.target.value})} 
                    type="date" 
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
                  <div className="relative">
                    <input 
                      required 
                      value={newStaff.email} 
                      onChange={e => setNewStaff({...newStaff, email: e.target.value})} 
                      type="email" 
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 outline-none transition-all placeholder:text-slate-300" 
                      placeholder="name@a1target.com" 
                    />
                    <i className="fas fa-envelope absolute right-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all uppercase tracking-[0.2em] text-[11px] mt-4 transform active:scale-95 flex items-center justify-center"
              >
                <span>Confirm Registration</span>
                <i className="fas fa-arrow-right ml-3"></i>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
