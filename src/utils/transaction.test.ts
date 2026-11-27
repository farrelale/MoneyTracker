import { describe, it, expect } from 'vitest';
import { validateTransfer, groupTransactionsByDay } from './transaction';

describe('Transaction Utils', () => {
  describe('validateTransfer', () => {
    it('valid jika pocket berbeda', () => {
      expect(validateTransfer(1, 2)).toBe(true);
      expect(validateTransfer(5, 10)).toBe(true);
    });

    it('tidak valid jika pocket sama', () => {
      expect(validateTransfer(1, 1)).toBe(false);
      expect(validateTransfer(5, 5)).toBe(false);
    });

    it('tidak valid jika salah satu undefined', () => {
      expect(validateTransfer(undefined, 2)).toBe(false);
      expect(validateTransfer(1, undefined)).toBe(false);
      expect(validateTransfer(undefined, undefined)).toBe(false);
    });
  });

  describe('groupTransactionsByDay', () => {
    it('kelompokkan transaksi per hari', () => {
      const transactions = [
        { id: 1, date: '2026-11-27', amount: 50000, type: 'expense' as const },
        { id: 2, date: '2026-11-27', amount: 25000, type: 'expense' as const },
        { id: 3, date: '2026-11-26', amount: 100000, type: 'income' as const }
      ];

      const grouped = groupTransactionsByDay(transactions);

      expect(grouped).toHaveLength(2);
      expect(grouped[0].date).toBe('2026-11-27');
      expect(grouped[0].transactions).toHaveLength(2);
      expect(grouped[1].date).toBe('2026-11-26');
      expect(grouped[1].transactions).toHaveLength(1);
    });

    it('hitung total harian dengan benar', () => {
      const transactions = [
        { id: 1, date: '2026-11-27', amount: 50000, type: 'expense' as const },
        { id: 2, date: '2026-11-27', amount: 100000, type: 'income' as const },
        { id: 3, date: '2026-11-27', amount: 25000, type: 'expense' as const }
      ];

      const grouped = groupTransactionsByDay(transactions);

      // Total = 100000 (income) - 50000 (expense) - 25000 (expense) = 25000
      expect(grouped[0].total).toBe(25000);
    });

    it('transfer tidak dihitung dalam total harian', () => {
      const transactions = [
        { id: 1, date: '2026-11-27', amount: 50000, type: 'expense' as const },
        { id: 2, date: '2026-11-27', amount: 100000, type: 'transfer' as const }
      ];

      const grouped = groupTransactionsByDay(transactions);

      // Total = -50000 (expense), transfer diabaikan
      expect(grouped[0].total).toBe(-50000);
    });

    it('return array kosong untuk input kosong', () => {
      const grouped = groupTransactionsByDay([]);
      expect(grouped).toHaveLength(0);
    });

    it('urutkan tanggal dari terbaru', () => {
      const transactions = [
        { id: 1, date: '2026-11-25', amount: 50000, type: 'expense' as const },
        { id: 2, date: '2026-11-27', amount: 25000, type: 'expense' as const },
        { id: 3, date: '2026-11-26', amount: 100000, type: 'income' as const }
      ];

      const grouped = groupTransactionsByDay(transactions);

      expect(grouped[0].date).toBe('2026-11-27');
      expect(grouped[1].date).toBe('2026-11-26');
      expect(grouped[2].date).toBe('2026-11-25');
    });
  });
});
