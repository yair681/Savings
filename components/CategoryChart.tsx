
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Transaction } from '../types';
import { ExpenseCategory } from '../types';

interface CategoryChartProps {
  transactions: Transaction[];
}

const COLORS = ['#10b981', '#3b82f6', '#ef4444', '#f97316', '#8b5cf6', '#ec4899', '#f59e0b'];

const CategoryChart: React.FC<CategoryChartProps> = ({ transactions }) => {
  const data = useMemo(() => {
    const categoryTotals = transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<ExpenseCategory, number>);

    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  if (data.length === 0) {
    return (
        <div className="flex items-center justify-center h-full">
            <p className="text-slate-400 text-center">הוסיפו הוצאות כדי לראות את התפלגות הקטגוריות</p>
        </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`₪${value.toFixed(2)}`, 'סה"כ']}
            contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                borderColor: '#475569',
                borderRadius: '0.75rem'
            }}
            labelStyle={{ color: '#cbd5e1' }}
            itemStyle={{ color: '#f1f5f9' }}
          />
          <Legend wrapperStyle={{fontSize: "12px"}}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
