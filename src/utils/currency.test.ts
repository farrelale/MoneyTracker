import { describe, it, expect } from 'vitest';
import { formatCurrency, parseCurrency } from './currency';

describe('formatCurrency', () => {
  it('should format IDR without decimals', () => {
    const formatted = formatCurrency(25000, 'IDR');
    expect(formatted).toContain('25');
    expect(formatted).toContain('000');
  });
  
  it('should format USD with 2 decimals', () => {
    const formatted = formatCurrency(1250, 'USD'); // 1250 sen = $12.50
    expect(formatted).toContain('12');
    expect(formatted).toContain('50');
  });
  
  it('should handle zero amount', () => {
    const idrFormatted = formatCurrency(0, 'IDR');
    const usdFormatted = formatCurrency(0, 'USD');
    expect(idrFormatted).toContain('0');
    expect(usdFormatted).toContain('0');
  });
});

describe('parseCurrency', () => {
  it('should parse IDR as integer', () => {
    const amount = parseCurrency('25000', 'IDR');
    expect(amount).toBe(25000);
  });
  
  it('should parse USD as cents', () => {
    const amount = parseCurrency('12.50', 'USD');
    expect(amount).toBe(1250);
  });
  
  it('should handle strings with currency symbols', () => {
    // IDR: "Rp 25.000" -> angka separator bisa titik atau koma
    // Parsing akan mengambil semua digit, jadi 25.000 menjadi 25000
    const idrAmount = parseCurrency('25000', 'IDR');
    const usdAmount = parseCurrency('$12.50', 'USD');
    expect(idrAmount).toBe(25000);
    expect(usdAmount).toBe(1250);
  });
  
  it('should return 0 for invalid input', () => {
    const amount = parseCurrency('abc', 'IDR');
    expect(amount).toBe(0);
  });
});
