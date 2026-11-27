export type Currency = 'IDR' | 'USD';

/**
 * Format angka menjadi string mata uang
 * IDR: Rp25.000 (tidak ada desimal)
 * USD: $4.00 (2 desimal)
 */
export function formatCurrency(amount: number, currency: Currency): string {
  const num = currency === 'IDR' ? amount : amount / 100;
  
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: currency === 'IDR' ? 0 : 2,
    maximumFractionDigits: currency === 'IDR' ? 0 : 2
  }).format(num);
}

/**
 * Parse input string menjadi integer
 * IDR: "25000" -> 25000
 * USD: "12.50" -> 1250
 */
export function parseCurrency(value: string, currency: Currency): number {
  const num = parseFloat(value.replace(/[^\d.]/g, ''));
  if (isNaN(num)) return 0;
  return currency === 'IDR' ? Math.round(num) : Math.round(num * 100);
}
