# MoniKu — Prompt Wireframe v2 untuk Google Stitch

Sumber: PRD v3, spesifikasi layar dari senior-product-designer (`wf2-designer`), aturan aksesibilitas dari frontend-specialist (`wf2-frontend`).
Proyek Stitch: "MoniKu Wireframe v2" (id 5788759526059285129).

Cara pakai: tempel **Prompt Dasar** sekali sebagai design system (atau di awal), lalu kirim **satu prompt layar per generate**. Satu layar per prompt hasilnya lebih rapi.

---

## A. Prompt Dasar (design brief, dipakai di semua layar)

```text
App: "MoniKu", a personal money tracker PWA for Android Chrome. Mobile, 390x844.
All on-screen text in Bahasa Indonesia. Fidelity: clean functional wireframe, minimal,
neutral greys + one emerald accent. No stock photos, no decorative illustration.

Tokens (light): bg #F4F4F5, surface #FFFFFF, text #18181B, muted #71717A,
accent #059669, income #059669, expense #DC2626, transfer #71717A, warning #D97706.
Font: Inter. Scale: display 28/700, title 16/600, body 14/400, caption 12/500.
Spacing 4/8/12/16/24. Card radius 12, input radius 8, FAB fully round.

Accessibility rules:
- Touch targets >= 48dp; icon buttons >= 40dp; 8px gap between targets.
- Never color alone: income "+ Rp8.000.000" with up-arrow icon, expense "− Rp75.000"
  with down-arrow icon, transfer with ⇄ icon in neutral grey.
- Budget bars always show a status word: "Aman" (<70%), "Hati-hati" (70–100%, ⚠), "Lewat" (>100%, ⚠).
- Money format Rp25.000 (dot thousands, no decimals); USD $4.00. Tabular numerals.
- Every icon-only button has a visible or implied label. Visible focus ring in accent.

Navigation (main tabs only): bottom bar with 5 slots —
Home · Transaksi · [raised round + FAB, center, accent] · Stats · Lainnya. Labels 12px under icons.
Sub-pages (from Lainnya) use a top bar with back arrow "‹" and title, no bottom bar.
Pickers (kategori, pocket, filter, tanggal) are bottom sheets with a drag handle, max 80% height.
Every list has an empty state: simple icon + one short line + action button.
```

---

## B. Prompt per layar

### 1. Onboarding
```text
Screen: Onboarding step 2 of 4. Top: step dots (4) and "Lewati" text button right.
Title "Atur dasar". Card "Mata uang": two large segmented options "IDR · Rp" (selected) and "USD · $".
Card "Periode bulanan mulai tanggal": big number "25" with − and + buttons, hint "Contoh: 25 Jan – 24 Feb".
Bottom: full-width primary button "Lanjut". Show small step list: 1 PIN · 2 Mata uang & periode · 3 Pocket pertama · 4 Selesai.
```

### 2. Layar kunci (PIN)
```text
Screen: Lock screen. Center: app name "MoniKu", caption "Masukkan PIN".
Six PIN dots (3 filled). 3x4 numeric keypad with large 64dp keys: 1–9, fingerprint icon (disabled, caption "V2"), 0, backspace.
Inline error example under dots in expense red: "PIN salah, coba lagi (2 kesempatan lagi)". No bottom nav.
```

### 3. Home
```text
Screen: Home tab. Header: "Halo 👋" and period chip "25 Nov – 24 Des".
Swipeable balance card (accent-tinted): label "Total semua pocket", amount "Rp4.250.000",
eye icon button "Sembunyikan saldo", page dots (4) and hint "Geser: Cash · BCA · Jago".
Row of two cards: "Masuk + Rp8.000.000" (income) and "Keluar − Rp3.750.000" (expense).
Card "Masuk vs keluar" with small grouped bar chart for 4 weeks (W1–W4), legend.
Card "Budget" with "Lihat semua ›": 🍜 Makanan Rp1.200.000 / Rp1.500.000, bar 80% "Hati-hati ⚠";
🎉 Hiburan Rp600.000 / Rp500.000, bar 100% "Lewat ⚠".
Card "Transaksi terakhir" with 3 rows. Bottom nav, Home active.
```

### 4. Tambah transaksi (Keluar / Masuk) + kalkulator
```text
Screen: Add transaction, full page. Top bar: "✕" (Tutup), title "Tambah", text button "Simpan" (accent).
Segmented control: Keluar (selected) · Masuk · Transfer.
Amount area: small expression line "50.000 + 25.000", big amount "Rp75.000".
Field rows (each 56dp, chevron): Kategori "🍜 Makanan", Pocket "💵 Cash", Tanggal "Hari ini, 27 Nov 2026",
Catatan placeholder "Tambah catatan…", Foto "📷 Tambah foto" (with one 56px thumbnail example).
Sticky calculator keypad at bottom, 4x4, keys >= 56dp: 7 8 9 ÷ / 4 5 6 × / 1 2 3 − / 000 0 ⌫ +, plus a wide "=" row.
Hint caption: "Kategori & pocket terakhir dipakai otomatis terpilih".
```

### 5. Transfer antar pocket
```text
Screen: Add transaction, Transfer selected in segmented control. Amount "Rp500.000".
Card "Dari": 🏦 BCA, "Saldo Rp3.000.000", chevron. Circular swap icon ⇄ between cards.
Card "Ke": 💵 Cash, "Saldo Rp250.000", chevron.
Field rows: Tanggal, Catatan "Tarik tunai".
Info banner (neutral): "Setelah disimpan, pocket tidak bisa diubah. Hanya nominal, tanggal, dan catatan."
Error example: "Pilih pocket yang berbeda" under the Ke card (dimmed state).
```

### 6. Bottom sheet: Pilih kategori
```text
Screen: Bottom sheet over dimmed Add Transaction. Drag handle, title "Pilih kategori", close button.
Tabs: Pengeluaran (selected) · Pemasukan. 4-column grid of category tiles (emoji + name, 72dp):
🍜 Makanan, 🚗 Transportasi, 🛍️ Belanja, 🧾 Tagihan, 💊 Kesehatan, 🎉 Hiburan, 📦 Lainnya, ☕ Kopi (custom).
Selected tile has accent border + check. Bottom: outline button "+ Buat kategori baru".
```

### 7. Bottom sheet: Pilih pocket
```text
Screen: Bottom sheet "Pilih pocket". List rows (64dp): emoji, name, purpose tag, balance right-aligned:
💵 Cash · Daily · Rp750.000 (selected, check), 🏦 BCA · Daily · Rp2.500.000, 📈 Jago · Investment · Rp1.500.000,
💳 Kartu Kredit · Debt · − Rp500.000 (expense color). Bottom: "+ Buat pocket baru".
```

### 8. Transaksi — Daftar
```text
Screen: Transaksi tab. Header "Transaksi" with search icon button. Segmented: Daftar (selected) · Kalender.
Period switcher "‹ 25 Nov – 24 Des ›" and chip button "Filter".
Active filter chips row: "Makanan ✕", "Cash ✕".
Grouped list by day with sticky day header and day total: "Hari ini, 27 Nov  − Rp95.000".
Rows 64dp: icon tile, title (category), subtitle "Cash · Makan siang", amount right with sign.
Include one transfer row "⇄ Transfer · BCA → Cash  Rp500.000" in grey, one income row "💼 Gaji + Rp8.000.000".
Show swipe-left reveal on one row with red "Hapus" action. Bottom nav, Transaksi active.
```

### 9. Transaksi — Kalender
```text
Screen: Transaksi tab, Kalender selected. Sub-tabs: Minggu · Bulan (selected) · Tahun.
Month header "‹ November 2026 ›". 7-column calendar grid (S S R K J S M), cells 48dp,
each with day number and a tiny net amount ("−95rb" red, "+8jt" green), today outlined, 27 selected (accent fill-tint).
Below: card "27 Nov" with its transactions (2 rows) and day total. Bottom nav, Transaksi active.
```

### 10. Detail / edit transaksi
```text
Screen: Detail transaksi. Top bar "‹" back, title "Detail transaksi", trash icon button.
Badge "Pengeluaran". Big amount "− Rp75.000". Editable rows: Kategori, Pocket, Tanggal, Catatan.
Photo thumbnail 96px with "Lihat" and "Hapus foto". Primary button "Simpan perubahan", outline red button "Hapus transaksi".
Also show a toast at bottom: "Transaksi dihapus  [Urungkan]".
```

### 11. Dialog hapus
```text
Screen: Modal dialog over dimmed list. Title "Hapus transaksi ini?", body "Kamu masih bisa membatalkan selama 5 detik."
Buttons: "Batal" (outline) and "Hapus" (red filled), each 48dp.
```

### 12. Bottom sheet: Cari & filter
```text
Screen: Bottom sheet "Cari & filter". Search field "Cari catatan atau nominal…".
Section Jenis: chips Semua · Keluar · Masuk · Transfer. Section Kategori: multi-select chips with emoji.
Section Pocket: multi-select chips. Section Tanggal: two date fields "Dari" "Sampai".
Footer: "Reset" text button and primary "Terapkan (12 hasil)".
```

### 13. Stats
```text
Screen: Stats tab. Header "Stats" with segmented Keluar · Masuk. Period chips: Hari · Minggu · Bulan (selected) · Tahun,
and "‹ 25 Nov – 24 Des ›".
Donut chart with center total "Rp3.750.000"; legend list sorted by size with emoji, name, %, amount:
Makanan 38%, Tagihan 22%, Hiburan 18%, Transportasi 10%, Lainnya 12%.
Card "✨ Ringkasan AI": "Pengeluaran naik 12% dari periode lalu. Paling besar di Makanan." with small refresh button.
Quote bubble (accent tint): "Periode ini banyak jajan, lagi happy ya! 😄".
Input row "Tanya AI…" with send button. Below: line chart "Tren 6 bulan" (masuk vs keluar),
horizontal bar list "Top 5 kategori". Bottom nav, Stats active.
Also show AI-missing state variant text: "Isi kunci Gemini di Setting untuk ringkasan AI  [Isi sekarang]".
```

### 14. Tanya AI (chat)
```text
Screen: "Tanya AI" page with back arrow. Privacy note under header: "Hanya angka ringkasan yang dikirim ke Gemini."
Suggestion chips: "Ringkasan 3 bulan terakhir", "Kategori paling boros?", "Bulan ini vs bulan lalu".
Chat: user bubble right (accent), AI bubble left (surface) with a short answer and a mini table of 3 months.
Bottom input "Tanya tentang keuanganmu…" with send button. Error example banner: "Kuota Gemini habis, coba lagi nanti."
```

### 15. Lainnya
```text
Screen: Lainnya tab. Title "Lainnya". List of 64dp rows, icon left, title + muted subtitle below, chevron:
👛 Pocket "4 pocket aktif"; 🎯 Budget "5 kategori"; 🏷️ Kategori "9 pengeluaran · 2 pemasukan";
📤 Export "Excel atau CSV"; 💾 Backup & Restore "Terakhir 12 Nov 2026" with small warning dot; ⚙️ Setting.
Bottom nav, Lainnya active.
```

### 16. Pocket
```text
Screen: Pocket list, top bar "‹ Pocket" and "+ Baru". Summary card "Total Rp4.250.000".
Pocket cards: emoji, name, purpose tag chip, description line, balance right:
💵 Cash (Daily) Rp750.000; 🏦 BCA (Daily, "Rekening gaji") Rp2.500.000; 📈 Jago (Investment, "Dana darurat") Rp1.500.000;
💳 Kartu Kredit (Debt, "Bayar tgl 5") − Rp500.000 in expense color. Section "Diarsipkan (1)" collapsed.
```

### 17. Detail pocket
```text
Screen: Detail pocket "🏦 BCA", top bar with back and "⋮" menu (Edit, Arsipkan).
Big balance "Rp2.500.000", purpose chip "Daily", description. Mini stats: Masuk periode ini, Keluar periode ini.
"5 transaksi terakhir" list and button "Lihat semua transaksi".
```

### 18. Form pocket
```text
Screen: "Pocket baru" form. Top bar "Batal" · title · "Simpan" (disabled until name filled).
Fields: Ikon (emoji button 56dp), Nama "MBanking A", Tujuan as chips Daily · Investment · Debt · Lainnya (custom text when Lainnya),
Deskripsi (optional), Saldo awal "Rp0" (only for new). Inline error example: "Nama pocket sudah ada".
```

### 19. Kelola kategori
```text
Screen: "Kategori" with back and "+ Baru". Tabs Pengeluaran · Pemasukan.
List rows: emoji, name, badge "Bawaan" for defaults, toggle "Tampilkan" right. One hidden row shown dimmed with label "Disembunyikan".
Footer note: "Kategori yang disembunyikan tetap ada di transaksi lama."
```

### 20. Form kategori + emoji picker
```text
Screen: "Kategori baru" form with big emoji preview button, Nama field, Jenis segmented Pengeluaran · Pemasukan.
Bottom sheet emoji picker open below: tabs Sering · Makanan · Transport · Belanja · Lainnya, 6-column emoji grid (48dp cells).
```

### 21. Budget
```text
Screen: "Budget" with back and "+ Atur". Summary card: "Income periode ini Rp8.000.000",
"Dibudget Rp5.000.000 (63%)", "Sisa belum dibudget Rp3.000.000", progress bar.
List: 🍜 Makanan 1.200.000/1.500.000 80% "Hati-hati ⚠"; 🧾 Tagihan 800.000/1.500.000 53% "Aman";
🎉 Hiburan 600.000/500.000 120% "Lewat ⚠"; 🚗 Transportasi 350.000/1.000.000 35% "Aman".
Each row shows remaining: "Sisa Rp300.000" or "Lewat Rp100.000".
```

### 22. Form budget
```text
Screen: "Atur budget" form. Field Kategori (picker, only categories without budget), Nominal per periode (calculator-style amount),
info "Periode mengikuti tanggal mulai: 25". Helper: "Rata-rata 3 periode terakhir: Rp1.320.000". Buttons Batal / Simpan.
```

### 23. Export
```text
Screen: "Export" page. Section Rentang: chips Periode ini · Bulan lalu · 3 bulan · 1 tahun · Custom (two date fields).
Section Format: two big option cards "Excel (.xlsx)" (selected) and "CSV". Section Data: Semua · Keluar · Masuk · Transfer.
Preview line: "245 transaksi akan diexport". Primary full-width "Export". Success toast "Tersimpan: MoniKu_2026-11.xlsx".
```

### 24. Backup & restore
```text
Screen: "Backup & Restore". Warning card: "Data hanya ada di HP ini. Kalau data browser dihapus, data ikut hilang."
Card "Backup terakhir: 12 Nov 2026 (15 hari lalu)" and primary button "Backup sekarang".
Divider. Card "Restore dari file" with outline button "Pilih file (.json)" and red caution text
"Restore akan menimpa semua data saat ini." Row "Pengingat backup: Tiap bulan ›".
```

### 25. Setting
```text
Screen: "Setting", grouped sections with headers:
Tampilan — Tema (chips: Ikut HP selected, Light, Dark, Emerald, Rosé Pine, AMOLED with small color swatches),
Font (Inter selected, Plus Jakarta Sans, Assistant, each label rendered in its own font).
Keuangan — Mata uang "IDR", Mulai periode "Tanggal 25".
Keamanan — PIN "Ubah PIN ›", Sidik jari (toggle, disabled, "V2").
Pengingat — Catat transaksi (toggle on, "21:00"), Backup "Tiap bulan".
AI — Kunci Gemini "Belum diisi ›" with caption "Disimpan di HP saja".
```

### 26. Ubah PIN
```text
Screen: "Ubah PIN" step screen: title "Masukkan PIN lama", 6 dots, numeric keypad 64dp keys,
step indicator "1/3 PIN lama · 2/3 PIN baru · 3/3 Konfirmasi". Error example "PIN baru tidak cocok".
```

---

## C. Tema lain (variasi, setelah layar light beres)

```text
Create a dark variant of this screen using: bg #0B0B0D, surface #17171A, text #E4E4E7, muted #A1A1AA,
accent #34D399, income #34D399, expense #F87171, warning #FBBF24. Keep layout identical.
```
| Tema | bg | surface | text | muted | accent | expense | warning |
|---|---|---|---|---|---|---|---|
| Emerald | #ECFDF5 | #FFFFFF | #064E3B | #6B7280 | #059669 | #DC2626 | #D97706 |
| Rosé Pine | #191724 | #1F1D2E | #E0DEF4 | #908CAA | #9CCFD8 | #EB6F92 | #F6C177 |
| AMOLED | #000000 | #0F0F0F | #EDEDED | #9CA3AF | #34D399 | #F87171 | #FCD34D |
