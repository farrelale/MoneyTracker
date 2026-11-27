import { db } from '../db/schema';
import { Period } from './period';

export type BudgetColor = 'green' | 'yellow' | 'red';

export interface BudgetStatus {
  categoryId: number;
  budget: number;
  spending: number;
  percentage: number;
  color: BudgetColor;
}

/**
 * Hitung status budget untuk kategori pengeluaran
 * Hijau: <70%, Kuning: 70-100%, Merah: >100%
 */
export async function getBudgetStatus(
  categoryId: number,
  period: Period
): Promise<BudgetStatus | null> {
  const budget = await db.budgets.where('categoryId').equals(categoryId).first();
  if (!budget) return null;
  
  const today = new Date().toISOString().split('T')[0];
  
  const transactions = await db.transactions
    .where('date')
    .between(period.start, period.end, true, true)
    .and(tx => 
      tx.type === 'expense' && 
      tx.categoryId === categoryId && 
      tx.deletedAt === undefined &&
      tx.date <= today // exclude masa depan
    )
    .toArray();
  
  const spending = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const percentage = budget.amount === 0 ? 0 : (spending / budget.amount) * 100;
  
  let color: BudgetColor;
  if (percentage < 70) color = 'green';
  else if (percentage <= 100) color = 'yellow';
  else color = 'red';
  
  return { categoryId, budget: budget.amount, spending, percentage, color };
}
