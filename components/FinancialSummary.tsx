import React from 'react';
import { FinancialState } from '../types';

interface FinancialSummaryProps {
  data: FinancialState;
}

const StatCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
  <div className="bg-slate-800 p-4 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:bg-slate-700">
    <div className="bg-emerald-500/20 p-3 rounded-full mt-1">
      {icon}
    </div>
    <div className="flex-grow">
      <p className="text-slate-400 text-sm font-bold">{title}</p>
      <div className="text-lg text-white">{children}</div>
    </div>
  </div>
);

const formatCurrency = (value: number) => `₪${value.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ data }) => {
  const hasDebtsToUser = data.debtsToUser && Object.keys(data.debtsToUser).length > 0;
  const hasUserDebts = data.userDebts && Object.keys(data.userDebts).length > 0;

  const totalDebtsToUser = hasDebtsToUser ? Object.values(data.debtsToUser!).reduce((a, b) => a + b, 0) : 0;
  
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {typeof data.cash === 'number' && (
        <StatCard 
          title="מזומן ביד"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
        >
          <p className="font-bold">{formatCurrency(data.cash)}</p>
        </StatCard>
      )}
      {typeof data.bank === 'number' && (
         <StatCard 
          title="בעובר ושב"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>}
        >
          <p className="font-bold">{formatCurrency(data.bank)}</p>
        </StatCard>
      )}
      {hasDebtsToUser && (
        <StatCard 
          title="חייבים לי"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
        >
          <p className="font-bold text-emerald-400">{formatCurrency(totalDebtsToUser)}</p>
          <ul className="text-xs text-slate-300 mt-1">
             {Object.entries(data.debtsToUser!).map(([person, amount]) => (
                <li key={person}>
                  {person}: {formatCurrency(amount)}
                </li>
             ))}
          </ul>
        </StatCard>
      )}
    </div>
  );
};

export default FinancialSummary;
