
import React, { useState } from 'react';

interface DashboardProps {
  totalExpenses: number;
  transactionCount: number;
  cashOnHand: number;
  debtOwed: number;
  onSetCashOnHand: (value: number) => void;
  onSetDebtOwed: (value: number) => void;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-slate-800 p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:bg-slate-700 hover:scale-105">
    <div className="bg-emerald-500/20 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-sm">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const EditableStatCard: React.FC<{ title: string; value: number; icon: React.ReactNode; onSave: (newValue: number) => void; }> = ({ title, value, icon, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value.toString());

    const handleSave = () => {
        const numericValue = parseFloat(inputValue);
        if (!isNaN(numericValue)) {
            onSave(numericValue);
            setIsEditing(false);
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-2xl flex items-center gap-4">
            <div className="bg-emerald-500/20 p-3 rounded-full">
              {icon}
            </div>
            <div className="flex-grow">
              <p className="text-slate-400 text-sm">{title}</p>
              {isEditing ? (
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    className="text-2xl font-bold text-white bg-transparent border-b-2 border-emerald-500 focus:outline-none w-full"
                    autoFocus
                  />
              ) : (
                <p className="text-2xl font-bold text-white">
                  ₪{value.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              )}
            </div>
            <button onClick={() => setIsEditing(!isEditing)} className="text-slate-500 hover:text-emerald-400 transition-colors">
                {isEditing ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
                )}
            </button>
        </div>
    );
};


const Dashboard: React.FC<DashboardProps> = ({ totalExpenses, transactionCount, cashOnHand, debtOwed, onSetCashOnHand, onSetDebtOwed }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <StatCard
        title="סך הכל הוצאות החודש"
        value={`₪${totalExpenses.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v-1m0 0H9m9 0h-3" /></svg>}
      />
       <StatCard
        title="מספר עסקאות"
        value={transactionCount}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>}
      />
      <EditableStatCard
        title="כסף זמין"
        value={cashOnHand}
        onSave={onSetCashOnHand}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
      />
      <EditableStatCard
        title="חוב מאבא"
        value={debtOwed}
        onSave={onSetDebtOwed}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z M18 21a2 2 0 11-4 0 2 2 0 014 0zM6 21a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
      />
    </div>
  );
};

export default Dashboard;
