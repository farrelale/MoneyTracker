# MoniKu - Ringkasan Rencana Teknis V1

Status: disetujui user (27 Nov 2026). Detail lengkap: `TECH-PROPOSAL.md`.

## Stack (final)
| Bagian | Pilihan |
|---|---|
| Bahasa | TypeScript |
| Build | Vite (`base: '/MoneyTracker/'` untuk GitHub Pages) |
| UI | Preact + preact-router + Preact Signals |
| Data | IndexedDB lewat Dexie |
| Offline | vite-plugin-pwa (Workbox) |
| Grafik | Chart.js (dimuat saat dibuka) |
| Excel/CSV | SheetJS xlsx (dimuat saat Export). Cek versi aman sebelum dipasang. |
| PIN | Web Crypto PBKDF2 + salt |
| Foto | Canvas, maks ~200 KB |
| Tema | CSS variables |
| Tes | Vitest |

## Data (IndexedDB)
- Uang = angka bulat. IDR dalam rupiah, USD dalam sen.
- Store: `transactions`, `pockets`, `categories`, `budgets`, `settings`.
- Transfer = satu baris (dari pocket, ke pocket). Pocket asal/tujuan tidak bisa diedit.
- Saldo pocket dihitung dari transaksi, tidak disimpan.
- Kategori: soft-delete (`hidden`). Pocket: arsip (`archived`).
- Periode bulanan mulai tgl N (user: 25). Tgl 29-31 dan Februari: pakai hari terakhir bulan.
- Minggu = Senin-Minggu.
- Budget: hijau <70%, kuning 70-100%, merah >100%.
- Backup = JSON berversi (termasuk foto). Skema diubah lewat versi Dexie.

## Tahapan
1. Fondasi: Vite+Preact+TS+Dexie, skema, kategori bawaan, 5 tab, Setting (mata uang, periode, tema).
2. Transaksi: form 3 jenis, kalkulator, daftar per hari, edit/hapus.
3. Pocket dan Kategori.
4. Budget dan Stats.
5. PIN dan foto.
6. Export, backup, restore.
7. PWA dan offline, uji di Android.
8. AI Gemini (bisa digeser ke V1.5).
9. Tema lengkap, font, kalender, onboarding, uji di HP.

## Aturan kerja
- Akun GitHub `farrelale`. Jangan push ke `main`. Pakai branch + PR.
- Satu tahap = satu PR.
