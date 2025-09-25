
import React from 'react';
import type { Transaction } from '../types';

interface ExpenseListProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return <p className="text-center text-slate-400 mt-4">אין עדיין הוצאות. נסו להוסיף אחת!</p>;
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
      {transactions.slice().reverse().map(t => (
        <div key={t.id} className="bg-slate-700 p-4 rounded-lg flex justify-between items-center transition-all hover:bg-slate-600/50">
          <div>
            <p className="font-bold text-white">{t.description}</p>
            <p className="text-sm text-slate-400">{t.category} &bull; {new Date(t.date).toLocaleDateString('he-IL')}</p>
          </div>
          <div className="flex items-center gap-4">
             <p className="font-semibold text-lg text-red-400">₪{t.amount.toFixed(2)}</p>
             <button onClick={() => onDelete(t.id)} className="text-slate-500 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
             </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
