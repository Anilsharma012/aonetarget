
import React, { useState } from 'react';
import { InventoryItem } from '../types';

const initialInventory: InventoryItem[] = [
  { id: 'INV001', name: 'Smart Class Projector', category: 'Electronics', cost: 45000, purchaseDate: '2023-05-12' },
  { id: 'INV002', name: 'Office Desks (Set of 10)', category: 'Furniture', cost: 120000, purchaseDate: '2023-01-10' },
  { id: 'EXP-10', name: 'Monthly Electricity Bill', category: 'Monthly Expense', cost: 12500, purchaseDate: '2023-10-01' },
  { id: 'EXP-11', name: 'Internet Lease Line', category: 'Monthly Expense', cost: 8500, purchaseDate: '2023-10-05' },
];

export const Inventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(initialInventory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: '', category: 'Infrastructure', cost: 0, purchaseDate: new Date().toISOString().split('T')[0]
  });

  const totalAssets = items.filter(i => i.category !== 'Monthly Expense').reduce((acc, curr) => acc + curr.cost, 0);
  const totalExpenses = items.filter(i => i.category === 'Monthly Expense').reduce((acc, curr) => acc + curr.cost, 0);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `${newItem.category === 'Monthly Expense' ? 'EXP' : 'INV'}-${Math.floor(Math.random() * 10000)}`;
    setItems([...items, { ...newItem, id } as InventoryItem]);
    setIsModalOpen(false);
    setNewItem({ name: '', category: 'Infrastructure', cost: 0, purchaseDate: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Asset Capital</p>
            <h2 className="text-4xl font-black text-slate-900 mt-1">₹{(totalAssets / 100000).toFixed(2)} L</h2>
            <div className="mt-5 h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: '65%' }}></div>
            </div>
          </div>
          <i className="fas fa-landmark absolute -right-6 -bottom-6 text-slate-50 text-[10rem] rotate-12 transition-transform group-hover:rotate-0"></i>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Operational OpEx</p>
            <h2 className="text-4xl font-black text-slate-900 mt-1">₹{(totalExpenses / 1000).toFixed(1)} K</h2>
            <p className="text-[10px] text-rose-500 font-black flex items-center mt-3 uppercase"><i className="fas fa-arrow-up mr-2"></i> +4.2% This Month</p>
          </div>
          <i className="fas fa-receipt absolute -right-6 -bottom-6 text-slate-50 text-[10rem] -rotate-12"></i>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Health Index</p>
          <h2 className="text-4xl font-black text-emerald-500 mt-1">OPTIMIZED</h2>
          <span className="text-[10px] text-emerald-600 font-black bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 uppercase tracking-widest inline-block mt-3">All units functional</span>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-50 overflow-hidden">
        <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
          <div>
            <h3 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em]">Institutional Capital & Expenditure Ledger</h3>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Central Investment Audit Trail</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-[10px] font-black text-white bg-slate-900 px-6 py-3.5 rounded-2xl shadow-xl hover:bg-black transition-all flex items-center gap-3 active:scale-95"
          >
            <i className="fas fa-plus"></i> Add Expenditure
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Expenditure Description</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Classification</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Date</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Investment Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs shadow-sm transition-all group-hover:scale-110 ${
                        item.category === 'Monthly Expense' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'
                      }`}>
                        <i className={`fas ${item.category === 'Electronics' ? 'fa-laptop' : item.category === 'Furniture' ? 'fa-couch' : item.category === 'Monthly Expense' ? 'fa-file-invoice-dollar' : 'fa-building'}`}></i>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-[11px] text-slate-800 uppercase tracking-tight">{item.name}</span>
                        <span className="text-[9px] text-slate-400 font-bold">UID: {item.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-center">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${
                      item.category === 'Monthly Expense' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                    }`}>{item.category}</span>
                  </td>
                  <td className="px-10 py-6 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                    {new Date(item.purchaseDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-10 py-6 text-right">
                    <span className="font-mono text-xs font-black text-slate-800">₹{item.cost.toLocaleString('en-IN')}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-center z-50 p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-10 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Audit Expenditure Entry</h3>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-2">Capital & Operational Ingestion</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-300 hover:text-rose-500 transition-all shadow-sm"><i className="fas fa-times"></i></button>
            </div>
            <form onSubmit={handleAddItem} className="p-10 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Expenditure Name</label>
                <input required value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} type="text" className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl px-6 py-4 text-sm font-black outline-none transition-all placeholder:text-slate-300" placeholder="e.g. SMART PANEL 75-INCH" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Classification</label>
                  <select value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value as any})} className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl px-6 py-4 text-sm font-black outline-none transition-all">
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Stationary">Stationary</option>
                    <option value="Monthly Expense">Monthly Expense</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Investment Amount</label>
                  <input required value={newItem.cost} onChange={e => setNewItem({...newItem, cost: Number(e.target.value)})} type="number" className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl px-6 py-4 text-sm font-black outline-none transition-all" placeholder="₹" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Transaction Date</label>
                <input required value={newItem.purchaseDate} onChange={e => setNewItem({...newItem, purchaseDate: e.target.value})} type="date" className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl px-6 py-4 text-sm font-black outline-none transition-all" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition-all uppercase tracking-[0.3em] text-[11px] mt-4 transform active:scale-95"> Confirm Ledger Entry </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
