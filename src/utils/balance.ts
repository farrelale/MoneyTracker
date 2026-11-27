import { db } from '../db/schema';

/**
 * Hitung saldo pocket berdasarkan transaksi
 */
export async function calculatePocketBalance(pocketId: number): Promise<number> {
  const pocket = await db.pockets.get(pocketId);
  if (!pocket) return 0;
  
  const transactions = await db.transactions
    .where('deletedAt').equals(undefined as any)
    .filter(tx => 
      tx.pocketId === pocketId || 
      tx.fromPocketId === pocketId || 
      tx.toPocketId === pocketId
    )
    .toArray();
  
  let balance = pocket.initialBalance;
  
  for (const tx of transactions) {
    if (tx.type === 'income' && tx.pocketId === pocketId) {
      balance += tx.amount;
    } else if (tx.type === 'expense' && tx.pocketId === pocketId) {
      balance -= tx.amount;
    } else if (tx.type === 'transfer') {
      if (tx.fromPocketId === pocketId) balance -= tx.amount;
      if (tx.toPocketId === pocketId) balance += tx.amount;
    }
  }
  
  return balance;
}

/**
 * Hitung total saldo semua pocket aktif
 */
export async function calculateTotalBalance(): Promise<number> {
  const pockets = await db.pockets.where('archivedAt').equals(undefined as any).toArray();
  let total = 0;
  
  for (const pocket of pockets) {
    const balance = await calculatePocketBalance(pocket.id!);
    total += balance;
  }
  
  return total;
}
