
import React from 'react';
import { Staff } from '../types';

const mockTeachers: Staff[] = [
  { id: 'T001', name: 'Prof. V.K. Singh', role: 'Teacher', email: 'vk.singh@a1target.com', department: 'IIT JEE', subject: 'Physics', joiningDate: '2020-05-15' },
  { id: 'T002', name: 'Dr. Neha Sharma', role: 'Teacher', email: 'neha.s@a1target.com', department: 'NEET', subject: 'Biology', joiningDate: '2021-02-10' },
  { id: 'T003', name: 'Sanjeev Goel', role: 'Teacher', email: 's.goel@a1target.com', department: 'IIT JEE', subject: 'Mathematics', joiningDate: '2019-11-20' },
  { id: 'T004', name: 'Priya Verma', role: 'Teacher', email: 'priya.v@a1target.com', department: 'Foundation', subject: 'Chemistry', joiningDate: '2022-08-01' },
];

export const Teachers: React.FC<{ role: 'Admin' | 'Staff' | null }> = ({ role }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Academic Faculty</h3>
          <p className="text-sm text-slate-500 font-medium">Manage subject experts and their class schedules</p>
        </div>
        {role === 'Admin' && (
          <button className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all">
            Recruit Faculty
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {mockTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4 border border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
                <i className="fas fa-user-graduate text-3xl group-hover:text-blue-500"></i>
              </div>
              <h4 className="font-black text-slate-800 uppercase tracking-tight">{teacher.name}</h4>
              <span className="mt-1 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-100 text-blue-700 border border-blue-200">
                Expert: {teacher.subject}
              </span>
              
              <div className="mt-6 w-full space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-widest">Department</span>
                  <span className="font-black text-slate-700">{teacher.department}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-widest">Faculty ID</span>
                  <span className="font-mono font-black text-blue-600">{teacher.id}</span>
                </div>
                <div className="pt-3 border-t border-slate-50">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-left mb-1">Official Contact</p>
                  <p className="text-xs font-medium text-slate-700 text-left truncate">{teacher.email}</p>
                </div>
              </div>
              
              <button className="mt-6 w-full py-2.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                View Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
