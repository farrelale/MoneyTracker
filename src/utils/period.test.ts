import { describe, it, expect } from 'vitest';
import { getCurrentPeriod, getCurrentWeek } from './period';

describe('getCurrentPeriod', () => {
  it('should return valid period with start and end dates', () => {
    const period = getCurrentPeriod(25);
    
    // Verifikasi format tanggal YYYY-MM-DD
    expect(period.start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(period.end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    
    // Verifikasi bahwa periode lebih dari 25 hari
    const start = new Date(period.start);
    const end = new Date(period.end);
    const diffDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    expect(diffDays).toBeGreaterThanOrEqual(25);
    expect(diffDays).toBeLessThanOrEqual(31);
  });
  
  it('should handle start day 1', () => {
    const period = getCurrentPeriod(1);
    
    // Start day bisa 1 atau hari terakhir bulan sebelumnya (tergantung tanggal hari ini)
    expect(period.start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(period.end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
  
  it('should handle start day 31', () => {
    const period = getCurrentPeriod(31);
    
    // Start day bisa 31, 30, 29, atau 28 tergantung bulan
    expect(period.start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(period.end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    
    // Periode harus sekitar 1 bulan
    const start = new Date(period.start);
    const end = new Date(period.end);
    const diffDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    expect(diffDays).toBeGreaterThanOrEqual(27);
    expect(diffDays).toBeLessThanOrEqual(31);
  });
});

describe('getCurrentWeek', () => {
  it('should return valid week with Monday start', () => {
    const week = getCurrentWeek();
    
    // Verifikasi format
    expect(week.start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(week.end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    
    // Verifikasi start adalah Senin
    const startDate = new Date(week.start);
    const dayOfWeek = startDate.getDay();
    expect(dayOfWeek).toBe(1); // 1 = Senin
  });
  
  it('should return 7-day period', () => {
    const week = getCurrentWeek();
    
    const startDate = new Date(week.start);
    const endDate = new Date(week.end);
    const diffDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    expect(diffDays).toBe(6); // Senin to Minggu = 6 hari selisih
  });
});
