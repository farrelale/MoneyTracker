export interface Period {
  start: string; // 'YYYY-MM-DD'
  end: string;   // 'YYYY-MM-DD'
}

/**
 * Hitung periode bulanan berdasarkan tanggal mulai custom
 * Menangani kasus tanggal 29-31 dan Februari
 */
export function getCurrentPeriod(startDay: number): Period {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-11
  const day = today.getDate();
  
  let periodStart: Date;
  
  if (day >= startDay) {
    // Periode berjalan: startDay bulan ini
    periodStart = new Date(year, month, startDay);
  } else {
    // Belum sampai startDay, berarti masih periode bulan lalu
    periodStart = new Date(year, month - 1, startDay);
  }
  
  // Handle tanggal tidak valid (misal 31 Feb → auto adjust ke hari terakhir bulan tersebut)
  const targetMonth = day >= startDay ? month : month - 1;
  const originalDate = periodStart.getDate();
  
  if (originalDate !== startDay) {
    // JavaScript auto-adjust jika tanggal tidak valid
    // Ambil hari terakhir dari bulan target
    periodStart = new Date(year, targetMonth + 1, 0);
  }
  
  const periodEnd = new Date(periodStart);
  periodEnd.setMonth(periodEnd.getMonth() + 1);
  periodEnd.setDate(periodEnd.getDate() - 1);
  
  return {
    start: periodStart.toISOString().split('T')[0],
    end: periodEnd.toISOString().split('T')[0]
  };
}

/**
 * Hitung periode minggu ini (Senin - Minggu)
 */
export function getCurrentWeek(): Period {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Minggu, 1=Senin, ..., 6=Sabtu
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // offset ke Senin
  
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  
  return {
    start: monday.toISOString().split('T')[0],
    end: sunday.toISOString().split('T')[0]
  };
}
