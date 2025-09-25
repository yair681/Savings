
import React, { useState } from 'react';
import { ExpenseCategory } from '../types';
import type { Transaction } from '../types';

interface ExpenseFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>(ExpenseCategory.Groceries);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) {
        alert("נא למלא את כל השדות");
        return;
    }
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
        alert("נא להזין סכום חיובי");
        return;
    }
    
    onSubmit({ description, amount: numericAmount, category });
    setDescription('');
    setAmount('');
    setCategory(ExpenseCategory.Groceries);
  };

  const inputClasses = "w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-400 mb-1">תיאור</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClasses}
          placeholder="למשל, קניות בסופר"
        />
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-slate-400 mb-1">סכום (₪)</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={inputClasses}
          placeholder="150.00"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-400 mb-1">קטגוריה</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
          className={inputClasses}
        >
          {Object.values(ExpenseCategory).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500"
      >
        הוסף הוצאה
      </button>
    </form>
  );
};

export default ExpenseForm;
