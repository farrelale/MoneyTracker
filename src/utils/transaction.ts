/**
 * Validasi transfer antar pocket
 * Return true jika pocket berbeda dan valid
 */
export function validateTransfer(
  fromPocketId: number | undefined,
  toPocketId: number | undefined
): boolean {
  if (!fromPocketId || !toPocketId) {
    return false;
  }
  
  return fromPocketId !== toPocketId;
}

/**
 * Interface untuk transaksi yang akan dikelompokkan
 */
export interface TransactionForGrouping {
  id?: number;
  date: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
}

/**
 * Interface untuk hasil pengelompokan
 */
export interface GroupedTransactions {
  date: string;
  transactions: TransactionForGrouping[];
  total: number;
}

/**
 * Kelompokkan transaksi per hari dan hitung total harian
 * Transfer tidak dihitung dalam total harian
 */
export function groupTransactionsByDay(
  transactions: TransactionForGrouping[]
): GroupedTransactions[] {
  if (transactions.length === 0) {
    return [];
  }

  const groups: { [date: string]: TransactionForGrouping[] } = {};
  
  transactions.forEach(tx => {
    if (!groups[tx.date]) {
      groups[tx.date] = [];
    }
    groups[tx.date].push(tx);
  });

  // Convert ke array dan hitung total per hari
  const result: GroupedTransactions[] = Object.keys(groups).map(date => {
    const txs = groups[date];
    const total = txs.reduce((sum, tx) => {
      if (tx.type === 'income') return sum + tx.amount;
      if (tx.type === 'expense') return sum - tx.amount;
      return sum; // transfer tidak dihitung
    }, 0);

    return {
      date,
      transactions: txs,
      total
    };
  });

  // Sort by date descending
  return result.sort((a, b) => b.date.localeCompare(a.date));
}
