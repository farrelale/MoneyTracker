import { describe, it, expect } from 'vitest';
import { evaluateExpression, formatNumber } from './calculator';

describe('Calculator', () => {
  describe('evaluateExpression', () => {
    it('evaluasi angka tunggal', () => {
      expect(evaluateExpression('50000')).toBe(50000);
      expect(evaluateExpression('0')).toBe(0);
    });

    it('evaluasi penjumlahan', () => {
      expect(evaluateExpression('50000+25000')).toBe(75000);
      expect(evaluateExpression('10 + 20 + 30')).toBe(60);
    });

    it('evaluasi pengurangan', () => {
      expect(evaluateExpression('100000-50000')).toBe(50000);
      expect(evaluateExpression('100 - 30 - 20')).toBe(50);
    });

    it('evaluasi perkalian', () => {
      expect(evaluateExpression('1000*5')).toBe(5000);
      expect(evaluateExpression('10x5')).toBe(50);
      expect(evaluateExpression('10×5')).toBe(50);
    });

    it('evaluasi pembagian', () => {
      expect(evaluateExpression('100/2')).toBe(50);
      expect(evaluateExpression('100÷4')).toBe(25);
    });

    it('evaluasi operasi campuran (urutan operasi)', () => {
      expect(evaluateExpression('10+5*2')).toBe(20); // 10 + (5*2)
      expect(evaluateExpression('100-20/2')).toBe(90); // 100 - (20/2)
      expect(evaluateExpression('10*2+5')).toBe(25); // (10*2) + 5
    });

    it('evaluasi dengan spasi', () => {
      expect(evaluateExpression('50000 + 25000')).toBe(75000);
      expect(evaluateExpression('10 * 5 + 3')).toBe(53);
    });

    it('return 0 untuk string kosong', () => {
      expect(evaluateExpression('')).toBe(0);
      expect(evaluateExpression('   ')).toBe(0);
    });

    it('error untuk ekspresi tidak valid', () => {
      expect(() => evaluateExpression('+')).toThrow();
      expect(() => evaluateExpression('10+')).toThrow();
      expect(() => evaluateExpression('+10')).toThrow();
    });

    it('error untuk pembagian nol', () => {
      expect(() => evaluateExpression('10/0')).toThrow('Tidak bisa dibagi nol');
    });
  });

  describe('formatNumber', () => {
    it('format dengan pemisah ribuan', () => {
      expect(formatNumber(50000)).toBe('50.000');
      expect(formatNumber(1000000)).toBe('1.000.000');
      expect(formatNumber(123)).toBe('123');
    });
  });
});
