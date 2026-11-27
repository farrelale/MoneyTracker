# MoniKu — Spesifikasi Wireframe v2

**Status:** Draft v2 (27 Nov 2026)  
**Prioritas:** Fitur V1  
**Total layar:** 18 layar  
**Alur tambah transaksi:** Maks 4 ketukan: (+) → Pilih jenis → Isi nominal → Simpan

---

## 1. Onboarding (pertama kali)

**Tujuan:** Setup awal: PIN, mata uang, periode bulanan, pocket pertama

**Elemen:**
- Progress indicator (1/4, 2/4, 3/4, 4/4)
- Langkah 1: Buat PIN 6 digit + konfirmasi
- Langkah 2: Pilih mata uang (IDR default / USD), pilih tanggal mulai periode (1-31, default 25)
- Langkah 3: Buat pocket pertama (nama, saldo awal opsional)
- Langkah 4: Selesai, tombol "Mulai"
- Tombol "Lewati" (langsung Home dengan setting default)

**Aksi utama:** Tombol "Lanjut" untuk tiap langkah, "Mulai" untuk masuk Home

**State kosong:** —

**State error:** PIN konfirmasi tidak cocok (ulangi); nama pocket kosong (tidak bisa lanjut)

---

## 2. Layar Kunci (setiap buka app)

**Tujuan:** Verifikasi PIN sebelum masuk

**Elemen:**
- Logo / nama "MoniKu"
- Instruksi "Masukkan PIN"
- 6 lingkaran indikator PIN (kosong / terisi)
- Keypad numerik 1-9, 0, ⌫ (backspace)
- Ikon sidik jari (V2, tidak aktif di V1)
- Pesan error jika salah

**Aksi utama:** Ketik 6 digit PIN, otomatis masuk Home jika benar

**State kosong:** —

**State error:** PIN salah → pesan "PIN salah, coba lagi"; salah 3x → tunggu 30 detik sebelum bisa input lagi

---

## 3. Home

**Tujuan:** Ringkasan cepat saldo, transaksi periode ini, budget

**Elemen:**
- Header: sapaan, periode berjalan (25 Nov – 24 Des)
- Kartu saldo: geser horizontal (Total semua → Pocket A → Pocket B → …), indikator dot, tombol 👁️ untuk hide/show saldo
- Ringkasan periode: kotak "Masuk" (hijau) dan "Keluar" (merah)
- Grafik mini: bar chart masuk vs keluar per minggu/hari
- Ringkasan Budget: 2 kategori teratas (progres bar hijau/kuning/merah), tombol "lihat semua"
- Navigasi bawah: Home (aktif) · Transaksi · (+) · Stats · Lainnya

**Aksi utama:** Tombol (+) tengah untuk tambah transaksi; geser kartu saldo; tap "lihat semua" budget

**State kosong:** Belum ada transaksi → grafik kosong, pesan "Belum ada transaksi bulan ini"

**State error:** —

---

## 4. Tambah Transaksi (Pengeluaran/Pemasukan)

**Tujuan:** Catat transaksi masuk atau keluar dengan cepat

**Elemen:**
- Header: tombol ✕ (tutup), judul "Tambah", tombol "Simpan" (hijau, aktif jika nominal >0)
- Tab jenis: Keluar (default) / Masuk / Transfer
- Input nominal (angka besar), baris ekspresi kalkulator di atas (misal "50.000 + 25.000")
- Field Kategori (tap → bottom sheet pilih kategori)
- Field Pocket (tap → bottom sheet pilih pocket)
- Field Tanggal (default hari ini, tap → date picker)
- Field Catatan (opsional, tap → keyboard)
- Field Foto (opsional, tap → kamera/galeri)
- Keypad kalkulator di bawah: 7-9, 4-6, 1-3, 000-0-⌫, operator +−×÷

**Aksi utama:** Simpan → kembali ke Home/Transaksi; ✕ → batal (konfirmasi jika sudah isi)

**State kosong:** Nominal 0 → tombol Simpan disabled (abu)

**State error:** Kategori atau Pocket belum dipilih → pesan "Pilih kategori dan pocket dulu"; foto >5MB → pesan "Foto terlalu besar, pilih yang lain"

---

## 5. Tambah Transfer Antar Pocket

**Tujuan:** Pindahkan uang dari satu pocket ke pocket lain

**Elemen:**
- Header: ✕, "Tambah", "Simpan"
- Tab: Keluar / Masuk / Transfer (aktif)
- Input nominal (angka besar)
- Kotak "Dari": nama pocket asal + saldo saat ini (tap → bottom sheet pilih pocket asal)
- Ikon panah ⬇️
- Kotak "Ke": nama pocket tujuan + saldo saat ini (tap → pilih pocket tujuan, tidak boleh sama dengan asal)
- Field Tanggal, Catatan (opsional)
- Pesan info: "Setelah disimpan, pocket tidak bisa diubah. Hanya nominal, tanggal, catatan."

**Aksi utama:** Simpan → transaksi tercatat sebagai transfer

**State kosong:** Pocket asal = tujuan → pesan error "Pilih pocket yang berbeda"

**State error:** Nominal 0 → tombol Simpan disabled

---

## 6. Pilih Kategori (Bottom Sheet)

**Tujuan:** Pilih kategori untuk transaksi (pengeluaran atau pemasukan)

**Elemen:**
- Header: judul "Pilih Kategori", tombol ✕
- Daftar kategori (emoji + nama), scroll vertikal
- Kategori bawaan: Makanan, Transportasi, Belanja, Tagihan, Kesehatan, Hiburan, Lainnya (pengeluaran); Gaji, Lainnya (pemasukan)
- Kategori custom user (jika ada)
- Tombol "+ Buat Kategori Baru" di bawah

**Aksi utama:** Tap kategori → kembali ke form transaksi dengan kategori terpilih

**State kosong:** Tidak ada kategori custom (hanya bawaan)

**State error:** —

---

## 7. Pilih Pocket (Bottom Sheet)

**Tujuan:** Pilih pocket untuk transaksi atau transfer

**Elemen:**
- Header: "Pilih Pocket", tombol ✕
- Daftar pocket (emoji/ikon + nama + saldo), scroll vertikal
- Tombol "+ Buat Pocket Baru" di bawah

**Aksi utama:** Tap pocket → kembali ke form transaksi dengan pocket terpilih

**State kosong:** Hanya ada 1 pocket default

**State error:** —

---

## 8. Transaksi: Daftar

**Tujuan:** Lihat semua transaksi dikelompokkan per hari, periode berjalan

**Elemen:**
- Header: "Transaksi", ikon 🔍 (cari/filter)
- Tab: Daftar (aktif) / Kalender
- Navigasi periode: ‹ 25 Nov – 24 Des › (geser bulan)
- Tombol "Filter ▾" (tap → bottom sheet filter kategori/pocket/jenis)
- Daftar transaksi: grup per hari (judul hari + total hari), tiap transaksi tampil emoji kategori, nama kategori, pocket, catatan singkat, nominal (merah/hijau/abu)
- Transaksi transfer tampil dengan ikon 🔁 dan keterangan "Pocket A → Pocket B"
- Swipe kiri transaksi → tombol hapus (merah)

**Aksi utama:** Tap transaksi → layar Detail/Edit Transaksi; swipe kiri → hapus (dengan konfirmasi); tap 🔍 → Cari Transaksi; Filter → bottom sheet filter

**State kosong:** Belum ada transaksi periode ini → pesan "Belum ada transaksi. Tap + untuk mulai"

**State error:** —

---

## 9. Transaksi: Kalender (History)

**Tujuan:** Lihat transaksi dalam bentuk kalender visual

**Elemen:**
- Header: "Transaksi", ikon 🔍
- Tab: Daftar / Kalender (aktif)
- Sub-tab: Minggu / Bulan (default) / Tahun
- Navigasi: ‹ November 2026 › (geser bulan)
- Grid kalender: 7 kolom (S-S-R-K-J-S-M), tiap sel tampil tanggal + ringkasan nominal (misal "−50rb", "+8jt") jika ada transaksi; tanggal terpilih diberi border warna aksen
- Kotak detail di bawah: tanggal terpilih, daftar transaksi hari itu (emoji kategori, nama, nominal)

**Aksi utama:** Tap tanggal → lihat detail transaksi hari itu di bawah; tap transaksi di detail → layar Detail/Edit Transaksi

**State kosong:** Bulan tanpa transaksi → kalender tampil angka tanggal saja tanpa nominal

**State error:** —

---

## 10. Detail/Edit Transaksi

**Tujuan:** Lihat detail lengkap transaksi, edit, atau hapus

**Elemen:**
- Header: ‹ Kembali, judul "Detail Transaksi", ikon hapus 🗑️
- Badge jenis: Pengeluaran / Pemasukan / Transfer
- Nominal (besar, bold)
- Field Kategori (editable, tap → pilih kategori baru)
- Field Pocket (untuk Pengeluaran/Pemasukan, editable; untuk Transfer, tampil "Dari → Ke" tidak bisa diedit)
- Field Tanggal (editable)
- Field Catatan (editable)
- Foto (jika ada, tampil thumbnail, tap → preview besar)
- Tombol "Simpan Perubahan" (hijau) di bawah
- Tombol "Hapus Transaksi" (merah, outline) di paling bawah

**Aksi utama:** Simpan → update transaksi; Hapus → konfirmasi → hapus (toast undo 3 detik)

**State kosong:** —

**State error:** Transfer: pocket tidak bisa diubah (field disabled dengan info "Pocket transfer tidak bisa diubah")

---

## 11. Konfirmasi Hapus Transaksi (Dialog)

**Tujuan:** Konfirmasi sebelum hapus transaksi

**Elemen:**
- Overlay gelap (modal)
- Kotak dialog: "Hapus transaksi ini?" (judul), "Transaksi akan dihapus dari daftar. Kamu bisa undo dalam 3 detik setelah hapus." (deskripsi)
- Tombol "Batal" (outline) dan "Hapus" (merah, solid)

**Aksi utama:** Hapus → transaksi terhapus, toast muncul "Transaksi dihapus" dengan tombol "Undo"; Batal → tutup dialog

**State kosong:** —

**State error:** —

---

## 12. Cari/Filter Transaksi (Bottom Sheet)

**Tujuan:** Cari transaksi berdasarkan kata kunci atau filter kategori/pocket/jenis

**Elemen:**
- Search bar: placeholder "Cari catatan transaksi…"
- Filter: 
  - Jenis (All / Pengeluaran / Pemasukan / Transfer)
  - Kategori (pilih multiple, checkbox)
  - Pocket (pilih multiple, checkbox)
  - Rentang tanggal (dari - sampai)
- Tombol "Reset" dan "Terapkan"

**Aksi utama:** Terapkan → kembali ke daftar transaksi dengan filter aktif; Reset → hapus semua filter

**State kosong:** Hasil filter kosong → pesan "Tidak ada transaksi yang sesuai"

**State error:** —

---

## 13. Stats

**Tujuan:** Visualisasi pengeluaran, ringkasan AI, quotes

**Elemen:**
- Header: "Stats", dropdown jenis "Keluar ▾" (Keluar/Masuk/Semua)
- Tab filter periode: Hari / Minggu / Bulan (default) / Tahun
- Donut chart: breakdown kategori (maks 7 + Lainnya), total di tengah
- Legenda: emoji kategori, nama, persentase, kotak warna
- Kotak "✨ Ringkasan AI" (jika kunci Gemini ada): teks ringkasan otomatis (misal "Pengeluaran naik 12% dari periode lalu. Paling besar di Makanan.")
- Kotak quote AI (ramah, ringan, misal "Periode ini banyak spending di Hiburan, lagi happy ya!")
- Kotak "💬 Tanya AI": placeholder "ringkasan 3 bulan…", tombol ➤ (tap → Ask AI Chat)
- Scroll ke bawah: bar chart masuk vs keluar per hari/minggu, garis tren 6 bulan, top 5 kategori
- Navigasi bawah: Home · Transaksi · (+) · Stats (aktif) · Lainnya

**Aksi utama:** Tap "Tanya AI" → layar Ask AI Chat; ubah periode → grafik update

**State kosong:** Belum ada transaksi → donut kosong, pesan "Belum ada data untuk ditampilkan"

**State error:** Kunci Gemini tidak ada → kotak AI tampil "Isi kunci Gemini di Setting untuk melihat ringkasan AI" dengan tombol "Isi Sekarang"

---

## 14. Ask AI Chat

**Tujuan:** Tanya AI tentang pola keuangan atau ringkasan periode tertentu

**Elemen:**
- Header: ‹ Kembali, "Tanya AI"
- Riwayat chat (scroll): bubble user (kanan, warna aksen), bubble AI (kiri, warna netral)
- Input chat di bawah: placeholder "Tanya tentang keuanganmu…", tombol kirim ➤
- Contoh pertanyaan (jika kosong): "Ringkasan 3 bulan terakhir", "Kategori paling boros?", "Bandingkan bulan ini vs lalu"

**Aksi utama:** Ketik pertanyaan → kirim → AI balas (loading 1-3 detik)

**State kosong:** Belum ada riwayat chat → tampil contoh pertanyaan sebagai tombol cepat

**State error:** Kuota Gemini habis → pesan "Kuota API Gemini habis, coba lagi nanti"; tidak ada koneksi internet → pesan "Tidak ada koneksi internet"

---

## 15. Lainnya (menu)

**Tujuan:** Akses ke fitur tambahan (Pocket, Budget, Kategori, Export, Backup, Setting)

**Elemen:**
- Header: "Lainnya"
- Daftar menu (kotak, tap → layar terkait):
  - 👛 Pocket (jumlah pocket)
  - 🎯 Budget (jumlah kategori dengan budget)
  - 🏷️ Kategori
  - 📤 Export Excel / CSV
  - 💾 Backup & Restore (tanggal terakhir backup)
  - ⚙️ Setting
- Navigasi bawah: Home · Transaksi · (+) · Stats · Lainnya (aktif)

**Aksi utama:** Tap menu → layar terkait

**State kosong:** —

**State error:** —

---

## 16. Pocket

**Tujuan:** Kelola semua pocket (lihat, tambah, edit, arsip)

**Elemen:**
- Header: ‹ Kembali "Pocket", tombol "+ Baru"
- Kotak total semua pocket (saldo keseluruhan)
- Daftar pocket (kotak per pocket): emoji/ikon, nama, saldo (merah jika minus), tujuan (daily/investment/debt/custom), deskripsi singkat
- Tap pocket → Detail Pocket

**Aksi utama:** + Baru → Form Tambah Pocket; tap pocket → Detail Pocket

**State kosong:** Hanya ada 1 pocket default

**State error:** —

---

## 17. Detail/Edit Pocket

**Tujuan:** Lihat detail pocket, edit, atau arsipkan

**Elemen:**
- Header: ‹ Kembali "Detail Pocket", ikon ⋮ (menu: Edit / Arsipkan)
- Nama pocket (besar)
- Saldo saat ini (bold, hijau/merah)
- Tujuan (daily/investment/debt/custom)
- Deskripsi
- Riwayat transaksi 5 terakhir di pocket ini
- Tombol "Lihat Semua Transaksi"

**Aksi utama:** Edit → Form Edit Pocket (nama, tujuan, deskripsi editable, saldo tidak); Arsipkan → konfirmasi → pocket diarsip (tidak tampil di daftar aktif, transaksi lama tetap ada)

**State kosong:** Belum ada transaksi di pocket ini → pesan "Belum ada transaksi"

**State error:** Arsipkan pocket yang punya transaksi → konfirmasi "Pocket ini punya X transaksi, yakin arsipkan?"

---

## 18. Form Tambah/Edit Pocket

**Tujuan:** Buat pocket baru atau edit pocket

**Elemen:**
- Header: ‹ Batal "Tambah/Edit Pocket" "Simpan"
- Input Nama (wajib)
- Input Emoji/Ikon (tap → emoji picker)
- Dropdown Tujuan: Daily / Investment / Debt / Custom (jika Custom, tampil input teks)
- Input Deskripsi (opsional)
- Input Saldo Awal (hanya untuk Tambah, tidak untuk Edit)

**Aksi utama:** Simpan → pocket dibuat/diupdate

**State kosong:** Nama kosong → tombol Simpan disabled

**State error:** Nama duplikat → pesan "Nama pocket sudah ada"

---

## 19. Kelola Kategori

**Tujuan:** Lihat, tambah, edit, atau sembunyikan kategori

**Elemen:**
- Header: ‹ Kembali "Kategori", tombol "+ Baru"
- Tab: Pengeluaran (default) / Pemasukan
- Daftar kategori (emoji + nama): bawaan (tidak bisa dihapus, hanya disembunyikan) dan custom
- Toggle "Tampilkan" di tiap kategori (hide/show dari pilihan transaksi baru)
- Tap kategori → Edit Kategori (nama, emoji)

**Aksi utama:** + Baru → Form Tambah Kategori; toggle hide → kategori disembunyikan (soft-delete); tap kategori → Edit

**State kosong:** Hanya kategori bawaan

**State error:** —

---

## 20. Form Tambah/Edit Kategori + Emoji Picker

**Tujuan:** Buat atau edit kategori custom

**Elemen:**
- Header: ‹ Batal "Tambah/Edit Kategori" "Simpan"
- Input Nama (wajib)
- Tombol Emoji (tap → emoji picker bottom sheet)
- Jenis: Pengeluaran / Pemasukan (hanya untuk Tambah)

**Aksi utama:** Simpan → kategori dibuat/diupdate

**State kosong:** Nama kosong → tombol Simpan disabled

**State error:** Nama duplikat dalam jenis yang sama → pesan "Nama kategori sudah ada"

**Emoji Picker (Bottom Sheet):**
- Grid emoji (scroll), grup: Sering Dipakai / Objek / Makanan / Transportasi / Aktivitas
- Search emoji (opsional V2)

---

## 21. Budget

**Tujuan:** Atur dan pantau budget per kategori pengeluaran

**Elemen:**
- Header: ‹ Kembali "Budget", tombol "+ Atur"
- Kotak income periode ini + total budget (berapa persen dari income, sisa income)
- Daftar kategori dengan budget: emoji, nama, spending / budget, bar progres (hijau <70%, kuning 70-100%, merah >100%)
- Tap kategori → Form Edit Budget

**Aksi utama:** + Atur → Form Tambah Budget (pilih kategori pengeluaran yang belum ada budget); tap kategori → Edit Budget (ubah nominal)

**State kosong:** Belum ada budget → pesan "Belum ada budget diatur. Tap + untuk mulai"

**State error:** —

---

## 22. Form Tambah/Edit Budget

**Tujuan:** Set budget untuk kategori pengeluaran

**Elemen:**
- Header: ‹ Batal "Atur Budget" "Simpan"
- Pilih Kategori (dropdown, hanya kategori pengeluaran yang belum ada budget; untuk Edit, kategori tidak bisa diubah)
- Input Nominal Budget (angka)
- Info: "Budget per bulan, periode mengikuti tanggal mulai di Setting"

**Aksi utama:** Simpan → budget dibuat/diupdate

**State kosong:** Nominal 0 → tombol Simpan disabled

**State error:** —

---

## 23. Export Excel / CSV

**Tujuan:** Download data transaksi ke file Excel atau CSV

**Elemen:**
- Header: ‹ Kembali "Export"
- Pilih Rentang Tanggal: Periode ini / Bulan lalu / 3 bulan / 6 bulan / 1 tahun / Custom (date picker)
- Pilih Format: Excel (.xlsx) / CSV
- Pilih Data: Semua / Hanya Pengeluaran / Hanya Pemasukan / Hanya Transfer
- Tombol "Export" (besar, hijau)

**Aksi utama:** Export → file didownload ke folder Downloads HP, toast "File berhasil diexport: MoniKu_2026-11.xlsx"

**State kosong:** Rentang tanggal dipilih tapi tidak ada transaksi → pesan "Tidak ada transaksi untuk diexport"

**State error:** Gagal download (permission) → pesan "Gagal export, izinkan akses penyimpanan"

---

## 24. Backup & Restore

**Tujuan:** Backup data ke file, restore dari file backup

**Elemen:**
- Header: ‹ Kembali "Backup & Restore"
- Kotak "Backup Terakhir": tanggal (atau "Belum pernah backup")
- Tombol "Backup Sekarang" (besar, hijau): tap → file .json didownload ke Downloads
- Garis pembatas
- Kotak "Restore dari Backup": tombol "Pilih File" → file picker .json
- Peringatan: "Restore akan menimpa semua data saat ini. Backup dulu sebelum restore."

**Aksi utama:** Backup → file didownload, toast "Backup berhasil: MoniKu_backup_2026-11-27.json"; Restore → konfirmasi → data ditimpa

**State kosong:** —

**State error:** File restore tidak valid → pesan "File backup tidak valid atau rusak"; restore gagal → pesan "Restore gagal, coba file lain"

---

## 25. Setting

**Tujuan:** Ubah tema, font, mata uang, periode, PIN, pengingat, kunci Gemini

**Elemen:**
- Header: ‹ Kembali "Setting"
- Field Tema: Ikut HP (default) / Light / Dark / Emerald / Rosé Pine / AMOLED (tap → pilih, langsung apply)
- Field Font: Inter (default) / Plus Jakarta Sans / Assistant (tap → pilih)
- Field Mata uang: IDR / USD (tap → konfirmasi jika sudah ada transaksi: "Mata uang hanya berlaku untuk transaksi baru")
- Field Mulai periode: Tanggal 1-31 (tap → number picker)
- Field PIN & sidik jari: tap → Layar Ubah PIN
- Field Pengingat catat: On/Off, waktu (tap → time picker)
- Field Pengingat backup: Off / Tiap minggu / Tiap bulan (tap → pilih)
- Field Kunci Gemini (AI): tap → input API key (password field), link "Dapatkan kunci gratis"

**Aksi utama:** Ubah setting → langsung tersimpan (auto-save)

**State kosong:** —

**State error:** Kunci Gemini salah → saat pakai AI, muncul pesan "Kunci Gemini tidak valid, cek di Setting"

---

## 26. Ubah PIN

**Tujuan:** Ubah PIN lama ke PIN baru

**Elemen:**
- Header: ‹ Batal "Ubah PIN"
- Input PIN Lama (password dots)
- Input PIN Baru (password dots)
- Input Konfirmasi PIN Baru (password dots)
- Tombol "Simpan" (hanya aktif jika semua terisi dan valid)

**Aksi utama:** Simpan → PIN diupdate, toast "PIN berhasil diubah"

**State kosong:** —

**State error:** PIN lama salah → pesan "PIN lama salah"; PIN baru tidak cocok dengan konfirmasi → pesan "PIN baru tidak cocok"

---

## Alur Tambah Transaksi (Maks 4 Ketukan)

**Jalur Cepat (4 ketukan):**
1. Tap tombol (+) di navigasi bawah
2. Ketik nominal di keypad (1-3 ketukan angka + operator jika pakai kalkulator)
3. Tap "Simpan" (kategori, pocket, tanggal otomatis: kategori terakhir dipakai / default "Lainnya", pocket default, tanggal hari ini)

**Jalur Lengkap (lebih dari 4 ketukan, opsional):**
1. Tap (+)
2. Ketik nominal
3. Tap Kategori → pilih
4. Tap Pocket → pilih
5. Tap Tanggal → pilih
6. Isi Catatan (opsional)
7. Tambah Foto (opsional)
8. Tap Simpan

---

## Tambahan: State Umum

**Empty State Universal:**
- Ikon ilustrasi sederhana (misal ikon dokumen kosong, 48x48)
- Pesan singkat (misal "Belum ada transaksi")
- Tombol aksi (misal "+ Tambah Transaksi")

**Error State Universal:**
- Ikon peringatan (⚠️)
- Pesan error spesifik (hindari "Terjadi kesalahan")
- Tombol "Coba Lagi" atau "Kembali"

**Loading State:**
- Skeleton screen (kotak abu-abu animasi) untuk daftar/grafik
- Spinner kecil untuk button action (misal saat simpan)

---

**Catatan Desain Fungsional:**

1. **Navigasi konsisten:** Semua layar dalam menu Lainnya (Pocket, Budget, Kategori, Export, Backup, Setting) punya tombol ‹ Kembali di header kiri
2. **Bottom sheet:** Dipakai untuk pilihan cepat (kategori, pocket, filter) agar tidak pindah layar penuh
3. **Konfirmasi aksi destruktif:** Hapus transaksi, arsip pocket, restore backup → wajib konfirmasi
4. **Undo:** Hapus transaksi bisa di-undo dalam 3 detik (toast dengan tombol Undo)
5. **Auto-save:** Setting langsung tersimpan saat diubah, tidak perlu tombol Simpan terpisah
6. **Validasi realtime:** Tombol Simpan disabled (abu) jika input wajib kosong atau tidak valid
7. **Feedback visual:** Toast (notif ringan 2-3 detik) untuk aksi berhasil; dialog modal untuk error penting
8. **Aksesibilitas:** Tombol minimal 44x44px (touch target), kontras warna min 4.5:1, label jelas

---

**Total layar:** 18 layar utama (tidak termasuk variasi bottom sheet, dialog konfirmasi, dan state)

**Prioritas V1:** Semua layar di atas kecuali Ask AI Chat (bisa dipindah V1.5 jika terlalu besar)
