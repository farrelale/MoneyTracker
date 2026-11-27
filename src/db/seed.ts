import { db } from './schema';

export async function seedDatabase() {
  // Cek apakah sudah ada data
  const existingCategories = await db.categories.count();
  if (existingCategories > 0) {
    return; // Sudah ada data, skip seed
  }

  const now = Date.now();

  // Seed kategori bawaan - Pengeluaran
  await db.categories.bulkAdd([
    { name: 'Makanan', emoji: '🍔', type: 'expense', isDefault: true, createdAt: now },
    { name: 'Transportasi', emoji: '🚗', type: 'expense', isDefault: true, createdAt: now },
    { name: 'Belanja', emoji: '🛒', type: 'expense', isDefault: true, createdAt: now },
    { name: 'Tagihan', emoji: '💳', type: 'expense', isDefault: true, createdAt: now },
    { name: 'Kesehatan', emoji: '🏥', type: 'expense', isDefault: true, createdAt: now },
    { name: 'Hiburan', emoji: '🎬', type: 'expense', isDefault: true, createdAt: now },
    { name: 'Lainnya', emoji: '📦', type: 'expense', isDefault: true, createdAt: now },
    // Pemasukan
    { name: 'Gaji', emoji: '💼', type: 'income', isDefault: true, createdAt: now },
    { name: 'Lainnya', emoji: '💰', type: 'income', isDefault: true, createdAt: now }
  ]);

  // Seed settings default
  await db.settings.bulkAdd([
    { key: 'currency', value: JSON.stringify('IDR'), updatedAt: now },
    { key: 'periodStartDay', value: JSON.stringify(25), updatedAt: now },
    { key: 'theme', value: JSON.stringify('system'), updatedAt: now }
  ]);
}
