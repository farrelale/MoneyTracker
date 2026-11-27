import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { db, Transaction, Category, Pocket } from '../db/schema';
import { formatNumber } from '../utils/calculator';

interface TransactionWithDetails extends Transaction {
  category?: Category;
  pocket?: Pocket;
  fromPocket?: Pocket;
  toPocket?: Pocket;
}

interface GroupedTransactions {
  date: string;
  dateLabel: string;
  transactions: TransactionWithDetails[];
  total: number;
}

export function TransactionList() {
  const [groupedTransactions, setGroupedTransactions] = useState<GroupedTransactions[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    setLoading(true);
    
    // Ambil semua transaksi yang tidak dihapus, urutkan dari terbaru
    const transactions = await db.transactions
      .where('deletedAt')
      .equals(undefined as any)
      .reverse()
      .sortBy('date');
    
    // Load details untuk setiap transaksi
    const transactionsWithDetails: TransactionWithDetails[] = [];
    
    for (const tx of transactions) {
      const details: TransactionWithDetails = { ...tx };
      
      if (tx.type === 'transfer') {
        if (tx.fromPocketId) {
          details.fromPocket = await db.pockets.get(tx.fromPocketId);
        }
        if (tx.toPocketId) {
          details.toPocket = await db.pockets.get(tx.toPocketId);
        }
      } else {
        details.category = await db.categories.get(tx.categoryId);
        if (tx.pocketId) {
          details.pocket = await db.pockets.get(tx.pocketId);
        }
      }
      
      transactionsWithDetails.push(details);
    }

    // Kelompokkan per hari
    const grouped = groupTransactionsByDate(transactionsWithDetails);
    setGroupedTransactions(grouped);
    setLoading(false);
  };

  const groupTransactionsByDate = (transactions: TransactionWithDetails[]): GroupedTransactions[] => {
    const groups: { [date: string]: TransactionWithDetails[] } = {};
    
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
        return sum; // transfer tidak dihitung dalam total harian
      }, 0);

      return {
        date,
        dateLabel: formatDateLabel(date),
        transactions: txs,
        total
      };
    });

    // Sort by date descending
    return result.sort((a, b) => b.date.localeCompare(a.date));
  };

  const formatDateLabel = (dateStr: string): string => {
    const date = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const txDate = new Date(date);
    txDate.setHours(0, 0, 0, 0);

    if (txDate.getTime() === today.getTime()) {
      return 'Hari Ini';
    } else if (txDate.getTime() === yesterday.getTime()) {
      return 'Kemarin';
    }

    // Format: Senin, 27 Nov 2026
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    };
    return date.toLocaleDateString('id-ID', options);
  };

  const handleTransactionClick = (txId: number) => {
    route(`/transactions/edit/${txId}`);
  };

  if (loading) {
    return (
      <div class="loading">
        <p>Memuat transaksi...</p>
      </div>
    );
  }

  if (groupedTransactions.length === 0) {
    return (
      <div class="empty-state">
        <p>Belum ada transaksi</p>
        <p class="text-muted">Tap tombol + untuk menambah transaksi pertama</p>
      </div>
    );
  }

  return (
    <div class="transaction-list">
      {groupedTransactions.map(group => (
        <div key={group.date} class="transaction-group">
          <div class="group-header">
            <span class="group-date">{group.dateLabel}</span>
            <span class={`group-total ${group.total >= 0 ? 'positive' : 'negative'}`}>
              {group.total >= 0 ? '+' : ''}Rp {formatNumber(Math.abs(group.total))}
            </span>
          </div>
          
          <div class="group-transactions">
            {group.transactions.map(tx => (
              <div 
                key={tx.id} 
                class="transaction-item"
                onClick={() => handleTransactionClick(tx.id!)}
              >
                <div class="tx-icon">
                  {tx.type === 'transfer' ? (
                    <span>🔁</span>
                  ) : (
                    <span>{tx.category?.emoji || '📦'}</span>
                  )}
                </div>
                
                <div class="tx-details">
                  <div class="tx-title">
                    {tx.type === 'transfer' ? (
                      <span>{tx.fromPocket?.name} → {tx.toPocket?.name}</span>
                    ) : (
                      <span>{tx.category?.name || 'Kategori tidak ditemukan'}</span>
                    )}
                  </div>
                  <div class="tx-meta">
                    {tx.type !== 'transfer' && tx.pocket && (
                      <span class="tx-pocket">{tx.pocket.emoji} {tx.pocket.name}</span>
                    )}
                    {tx.note && (
                      <span class="tx-note">{tx.note}</span>
                    )}
                  </div>
                </div>
                
                <div class={`tx-amount ${tx.type === 'income' ? 'positive' : tx.type === 'expense' ? 'negative' : 'neutral'}`}>
                  {tx.type === 'income' && '+'}
                  {tx.type === 'expense' && '-'}
                  Rp {formatNumber(tx.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
