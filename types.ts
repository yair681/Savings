export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface FinancialState {
  cash?: number;
  bank?: number;
  debtsToUser?: Record<string, number>;
  userDebts?: Record<string, number>;
  reset?: boolean;
}

// FIX: Define and export the ExpenseCategory enum to resolve import errors.
export enum ExpenseCategory {
  Groceries = "מצרכים",
  Transport = "תחבורה",
  Entertainment = "בידור",
  Utilities = "חשבונות",
  Rent = "שכר דירה",
  Health = "בריאות",
  Other = "אחר",
}

// FIX: Define and export the Transaction interface to resolve import errors.
export interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}