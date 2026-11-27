# Aturan Desain MoniKu Wireframe v2

Dokumen ini berisi aturan wajib untuk wireframe v2 agar accessible, jelas, dan mudah dibangun sebagai PWA Android Chrome (mobile-first, 360–412px).

---

## 1. Ukuran Target Sentuh & Zona Jempol

### Target Sentuh Minimum
- **48 × 48dp** (≈ 48px pada viewport 360px) untuk semua elemen interaktif: tombol, link, pill selector, item list transaksi, cell kalender
- Tombol kecil seperti ikon ✕ atau 🔍: minimal **40 × 40px** dengan padding visual cukup (tambah invisible tap area lewat padding/pseudo-element)
- Jarak antar target sentuh: minimal **8px** agar tidak salah tap

### Zona Jempol (Thumb Zone)
```
┌─────────────┐  Layar HP (412px lebar)
│   [sulit]   │  ← Header / top bar: tombol kanan/kiri sulit dijangkau satu tangan
│   [mudah]   │  ← Area tengah-bawah: ideal
│  [+] nav    │  ← Bottom nav + FAB +: sangat mudah dijangkau
└─────────────┘
```
- **Tombol + FAB di tengah bawah**: posisi ideal untuk jempol kanan & kiri
- **Bottom nav 5 ikon**: jangkauan baik, lebar tiap item ≈82px (412÷5), cukup untuk 48dp
- **Header action**: tombol kanan (Simpan) mudah dijangkau jempol kanan, tombol kiri (✕) untuk jempol kiri atau tangan lain — acceptable
- **Scroll vertikal**: konten utama di tengah layar, zona nyaman

**Rekomendasi**: Tombol paling penting (Simpan, +, nav aktif) tetap di bawah. Tombol sekunder (✕, 🔍, filter) boleh di atas tapi ukuran tetap 40–48dp.

---

## 2. Tipografi

### Ukuran Font Minimum
- **Body text**: 13px (saat ini sudah dipakai) — readable, boleh dinaikkan ke **14px** untuk lebih nyaman
- **Label muted / caption**: minimal **11px** (saat ini sudah ada)
- **Heading / saldo besar**: 22–28px (sudah ada .big 22px, cukup)
- **Angka kalender kecil**: 10px (sudah ada, limit bawah, lebih kecil tidak disarankan)

### Skala Tipografi
```
Heading besar (saldo, judul):   22–28px, bold (700)
Subheading (nama pocket):       14–16px, semibold (600)
Body (label, item):             13–14px, regular (400)
Caption (muted, hint):          11–12px, regular (400)
```

### Line Height
- Body: `1.5` (sudah ada di `.note`)
- Heading: `1.2`–`1.3`
- Caption: `1.4`

### Font Weight
- **Regular**: 400 (default body)
- **Semibold**: 600 (subheading, label penting)
- **Bold**: 700 (heading, angka saldo)

**Font**: Inter (default), Plus Jakarta Sans, Assistant — sudah benar, semua support Latin + angka tabular (lihat angka tabular di bawah).

---

## 3. Kontras Warna WCAG AA & Token per Tema

Target: **WCAG AA** = kontras minimal 4.5:1 untuk text normal, 3:1 untuk text besar (≥18px bold atau ≥24px regular) dan UI components.

### Token Warna (8 kategori)
```
bg            → background utama
surface       → card / elevated surface
text          → text utama
muted         → text sekunder / caption
accent        → tombol primary, pill aktif, link
income        → transaksi masuk (hijau)
expense       → transaksi keluar (merah)
transfer      → transaksi transfer (abu netral)
warning       → budget kuning 70–100%
```

### Tema Light (default)
```
bg:          #F4F4F5    (zinc-100)
surface:     #FFFFFF    (white, card)
text:        #18181B    (zinc-900) — kontras 16.1:1 pada #FFF ✓
muted:       #71717A    (zinc-500) — kontras 4.6:1 pada #FFF ✓
accent:      #10B981    (emerald-500) — kontras 3.1:1 pada #FFF (cukup untuk button, text besar) ✓
income:      #10B981    (emerald-500, sama accent)
expense:     #EF4444    (red-500) — kontras 3.5:1 pada #FFF ✓
transfer:    #71717A    (zinc-500, sama muted)
warning:     #F59E0B    (amber-500) — kontras 2.4:1 (kurang untuk text kecil, OK untuk bar/icon, text besar)
```
**Catatan**: untuk text kecil warning (11–13px), gunakan `#D97706` (amber-600, kontras 3.8:1) atau tambahkan ikon ⚠️.

### Tema Dark
```
bg:          #0B0B0D    (zinc-950 lebih gelap)
surface:     #17171A    (zinc-900)
text:        #E4E4E7    (zinc-200) — kontras 11.6:1 pada #17171A ✓
muted:       #A1A1AA    (zinc-400) — kontras 5.3:1 pada #17171A ✓
accent:      #34D399    (emerald-400, lebih terang dari light) — kontras 4.1:1 ✓
income:      #34D399    (emerald-400)
expense:     #F87171    (red-400) — kontras 4.3:1 ✓
transfer:    #A1A1AA    (sama muted)
warning:     #FBBF24    (amber-400) — kontras 5.8:1 ✓
```

### Tema Emerald (light variant, accent hijau lebih dominan)
```
bg:          #ECFDF5    (emerald-50)
surface:     #FFFFFF
text:        #064E3B    (emerald-900) — kontras 13.4:1 ✓
muted:       #6B7280    (gray-500) — kontras 4.5:1 ✓
accent:      #059669    (emerald-600) — kontras 4.9:1 ✓
income:      #059669
expense:     #DC2626    (red-600) — kontras 5.9:1 ✓
transfer:    #6B7280
warning:     #D97706    (amber-600) — kontras 3.8:1 ✓
```

### Tema Rose Pine (soft, agak vintage)
```
bg:          #191724    (rose pine base)
surface:     #1F1D2E    (rose pine surface)
text:        #E0DEF4    (rose pine text) — kontras 10.2:1 ✓
muted:       #908CAA    (rose pine muted) — kontras 4.1:1 ✓
accent:      #9CCFD8    (rose pine foam, cyan) — kontras 6.8:1 ✓
income:      #9CCFD8    (foam)
expense:     #EB6F92    (rose pine love, pink) — kontras 4.2:1 ✓
transfer:    #908CAA    (muted)
warning:     #F6C177    (rose pine gold) — kontras 7.1:1 ✓
```

### Tema AMOLED (pure black untuk OLED)
```
bg:          #000000    (black murni)
surface:     #0F0F0F    (nyaris black, card)
text:        #EDEDED    (off-white) — kontras 15.3:1 ✓
muted:       #9CA3AF    (gray-400) — kontras 5.2:1 ✓
accent:      #34D399    (emerald-400) — kontras 5.1:1 ✓
income:      #34D399
expense:     #F87171    (red-400) — kontras 5.1:1 ✓
transfer:    #9CA3AF
warning:     #FCD34D    (yellow-300) — kontras 8.5:1 ✓
```

### Tambahan Token untuk Border & Elevated
```
border:      (opacity 0.1–0.2 dari text, atau gray-300 light / gray-700 dark)
bg-elevated: (satu step lebih terang dari bg, untuk card hover / active state)
```

---

## 4. Jangan Hanya Mengandalkan Warna: Ikon & Tanda

**WCAG**: jangan hanya gunakan warna untuk menyampaikan informasi (colorblind users).

### Transaksi
- **Pemasukan**: warna hijau (`income`) **+ tanda `+`** di depan angka **+ ikon ⬆️ atau 💰**
- **Pengeluaran**: warna merah (`expense`) **+ tanda `−`** di depan angka **+ ikon ⬇️ atau 💸**
- **Transfer**: warna netral (`transfer`) **+ ikon 🔁** atau `⇄`
- Contoh: `+ Rp8.000.000` (hijau), `− Rp75.000` (merah)

### Budget Bar
- Hijau (<70%): ✓ atau tanpa ikon
- Kuning (70–100%): ⚠️
- Merah (>100%): ⚠️ atau 🔥

### Kategori
- Tiap kategori punya **emoji** (sudah ada di wireframe) — excellent, visual cue jelas

---

## 5. Format Angka

### Mata Uang
- **IDR**: `Rp25.000` (titik sebagai separator ribuan, tanpa desimal, kecuali perlu sen `Rp25.000,50`)
- **USD**: `$4.00` (koma separator ribuan `$4,250.00`, titik desimal)
- Implementasi: `Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'})` atau `en-US` untuk USD

### Angka Tabular (Tabular Numerals)
- **Penting** untuk alignment angka di list transaksi dan tabel budget
- Font Inter, Plus Jakarta Sans, Assistant **sudah support** tabular numerals
- CSS: `font-variant-numeric: tabular-nums;` atau `font-feature-settings: "tnum";`
- Terapkan di `.big`, `.tx span` (angka transaksi), `.bar` label, cell kalender

### Singkatan
- Boleh pakai `Rp1,2jt`, `Rp600rb`, `8jt` di tempat sempit (kalender, preview budget) **tapi** tetap tampilkan angka penuh di tooltip atau detail
- Hindari singkatan di transaksi list utama dan form input

---

## 6. Label untuk Screen Reader (Accessibility)

### Aria Label & Semantic HTML
- **Navigasi bawah**: `<nav aria-label="Navigasi utama"><button aria-label="Halaman Home" aria-current="page">🏠 Home</button></nav>`
- **Tombol ikon**: `<button aria-label="Tutup">✕</button>`, `<button aria-label="Cari transaksi">🔍</button>`
- **Tombol FAB +**: `<button aria-label="Tambah transaksi baru">+</button>`
- **Pill selector**: `<button role="tab" aria-selected="true">Keluar</button>`
- **Kartu saldo geser**: `<div role="region" aria-label="Saldo pocket, geser untuk melihat detail">...</div>`
- **Kalender cell**: `<button aria-label="24 November, pengeluaran Rp95.000">24<br>95rb</button>`
- **Hide balance**: `<button aria-label="Sembunyikan saldo" aria-pressed="false">👁️</button>`

### Emoji
- Emoji bukan teks alt, harus ada label: `<span role="img" aria-label="Makanan">🍜</span>` atau gunakan emoji dekoratif `aria-hidden="true"` lalu tambahkan `<span class="sr-only">Makanan</span>`

### Angka Uang
- Screen reader baca "Rp75.000" sebagai "Rupiah tujuh puluh lima ribu" (OK secara default)
- Pastikan tanda `+` dan `−` terbaca: `<span aria-label="Pemasukan delapan juta rupiah">+ Rp8.000.000</span>`

---

## 7. Fokus Keyboard (Keyboard Navigation)

PWA Android Chrome jarang pakai keyboard fisik, **tapi** penting untuk:
1. External keyboard user (tablet + keyboard, HP + BT keyboard)
2. Switch access (assistive tech)
3. Debugger desktop Chrome

### Aturan Fokus
- **Semua elemen interaktif** harus bisa di-tab: button, link, input, pill, nav
- **Tab order** logis: top → bottom, left → right
- **Focus visible**: outline jelas, minimal **2px solid accent**, offset **2px**
  ```css
  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  ```
- **Skip link**: tambahkan "Skip to main content" di paling atas untuk keyboard user (hidden sampai fokus)
- **Modal / Bottom Sheet**: trap fokus di dalam modal, Esc untuk tutup
- **Kalender**: arrow keys untuk navigasi antar tanggal (nice to have)

---

## 8. Reduced Motion

User yang enable "Reduce motion" (Android: Settings > Accessibility > Remove animations):
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
- Swipe gesture kartu pocket: ganti fade animation jadi instant
- Chart animasi: skip animasi, langsung tampil final
- Bottom sheet slide up: ganti jadi fade in

---

## 9. Safe Area & Gesture Navigation Android

### Bottom Gesture Bar
Android 10+ punya gesture bar di bawah (tinggi ±20–24px), bisa tutup bottom nav.
```css
body {
  padding-bottom: env(safe-area-inset-bottom, 0);
}
.nav {
  padding-bottom: calc(10px + env(safe-area-inset-bottom, 0));
}
```
- **Bottom nav**: tambah padding bawah `env(safe-area-inset-bottom)` agar tidak ketutup gesture bar
- **FAB +**: posisi tetap, tapi hitung offset gesture bar

### Top Notch / Camera Cutout
Jarang masalah di PWA karena status bar Chrome. Tapi jika fullscreen (future):
```css
header {
  padding-top: calc(16px + env(safe-area-inset-top, 0));
}
```

### Viewport Meta
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```
`viewport-fit=cover` agar PWA bisa pakai safe area.

---

## 10. Bottom Sheet vs Halaman Penuh

### Bottom Sheet (Drawer)
Untuk form cepat atau pilihan:
- **Tambah transaksi** (screen 4, 5): bottom sheet **atau** full page? → **Full page** lebih baik karena ada kalkulator 16 tombol, butuh banyak ruang vertikal. Kalau bottom sheet, bakal scroll banyak.
- **Filter transaksi**: bottom sheet (3–5 pilihan saja)
- **Pilih pocket / kategori**: bottom sheet (list 4–10 item)
- **Date picker**: bottom sheet (kalender kecil)

### Halaman Penuh
- **Form transaksi + kalkulator**: full page (sudah benar)
- **Daftar transaksi, Stats, Pocket, Budget**: full page
- **Setting**: full page

### Implementasi Bottom Sheet
- **Max height**: 70–80% viewport (sisakan 20% atas biar user sadar ini overlay)
- **Backdrop**: semi-transparent dark overlay, tap untuk tutup
- **Swipe down** untuk tutup (handle bar di atas sheet)
- **Fokus trap**: jangan biarkan fokus keluar dari sheet saat terbuka

---

## 11. Keyboard Numerik untuk Nominal

### Input Type & Inputmode
```html
<input type="text" inputmode="decimal" pattern="[0-9]*">
```
- **`inputmode="decimal"`**: Android Chrome tampilkan keyboard angka + titik/koma (untuk desimal)
- **`inputmode="numeric"`**: hanya angka 0–9 (alternatif jika tidak butuh desimal)
- **Jangan** pakai `type="number"` karena ada arrow spinner yang tidak perlu

### Kalkulator Custom (Wireframe Screen 4)
- Sudah ada grid 4×4 kalkulator di wireframe — **excellent**
- Keyboard hardware tetap bisa input (jangan disable)
- Keyboard virtual (Android) muncul saat fokus input, tapi kalkulator custom tetap terlihat (fixed position atau dalam scrollable area)

---

## 12. Empty, Loading, Error State

### Empty State
- **Transaksi kosong**: ilustrasi sederhana (SVG icon atau emoji besar) + text "Belum ada transaksi. Tap + untuk mulai"
- **Pocket kosong**: "Belum ada pocket. Tambah pocket pertama?"
- **Budget belum diatur**: "Budget belum diatur. Atur di sini ›"

### Loading State
- **Skeleton screen**: placeholder abu-abu animasi shimmer untuk card, list item
- **Spinner**: small spinner (24×24px) di tengah konten, atau inline saat save
- **Lazy load kalender**: tampilkan bulan aktif dulu, load bulan lain saat scroll

### Error State
- **Offline** (IndexedDB gagal): banner merah atas "Tidak bisa menyimpan data. Cek penyimpanan HP."
- **Gemini API gagal**: inline di Stats "✗ AI tidak tersedia saat ini. Coba lagi nanti." — app tetap jalan
- **Form validation**: error text merah di bawah field, `aria-invalid="true"`, fokus ke field salah

---

## 13. Grid Jarak & Spacing System

### Base Unit: 4px
```
4px   → gap kecil (antar ikon & text, antar pill)
8px   → gap sedang (antar field, antar card kecil)
12px  → gap besar (antar section dalam card)
16px  → padding card, padding horizontal layar
20px  → padding horizontal body (wireframe pakai 14px, **naikkan ke 16px** untuk konsistensi)
24px  → gap antar card di scroll vertikal
```

### Implementasi
```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
}
.box { padding: var(--space-4); gap: var(--space-3); }
.body { padding: var(--space-4) var(--space-4) var(--space-6); gap: var(--space-3); }
```

### Border Radius
```
8px   → input field, button kecil
10px  → icon box transaksi (.tx .ic)
12px  → card (.box)
28px  → phone container (outer), FAB (rounded-full 50%)
```

---

## 14. Komponen yang Bisa Dipakai Ulang

### 1. **Button**
- Variant: primary (accent bg), secondary (outline), ghost (no border)
- Size: small (32px height), medium (40px), large (48px), FAB (52×52)
- State: default, hover (web), active (pressed), disabled, focus

### 2. **Card**
- Base: `.box` padding 10–16px, border-radius 12px, background surface, border dashed (wireframe) → solid di production
- Variant: default, elevated (shadow), accent-bg (untuk highlight)

### 3. **Pill Selector** (Tab)
- Toggle button group: `<div role="tablist"><button role="tab" aria-selected="true">Keluar</button>...</div>`
- State: default (border only), active (bg accent, text white)

### 4. **Field Row**
- Label + value, border-bottom: `.field { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid border; }`
- Clickable → tambah `›` dan hover state

### 5. **Transaction Item** (`.tx`)
- Icon box 30×30 + text 2 baris + amount
- Border-bottom, tap area 48px+ vertical

### 6. **Progress Bar**
- Height 8px, border-radius 99px, background border color, inner bar pakai income/warning/expense
- Label di atas: nama + angka

### 7. **Donut Chart**
- SVG atau CSS conic-gradient (wireframe pakai conic-gradient — OK untuk v1, tapi SVG lebih accessible untuk label)
- Minimal 5 warna beda (lihat token + blue), center hole 60% diameter

### 8. **Bar Chart** (vertical bars)
- CSS flex layout, bar pakai `<div>` dengan height dynamic, border-radius top
- Responsive: lebar bar = flex:1 dengan max-width

### 9. **Calendar Grid**
- CSS Grid 7 kolom, cell 40×40px+ (cukup 48dp tap target)
- State: default, selected (border accent), today (outline), has-transaction (badge angka kecil)

### 10. **Bottom Nav**
- 5 item fixed bottom, flex layout, icon 16–20px + label 10px
- Active state: accent color + heavier weight atau underline

### 11. **FAB (Floating Action Button)**
- 52×52px, border-radius 50%, shadow, center align content
- Position fixed, bottom 16px + safe-area-inset

### 12. **Input + Kalkulator**
- Input field readonly + kalkulator grid 4×4
- Button kalkulator 48×48 dp (cukup untuk jari)

### 13. **Modal / Bottom Sheet**
- Backdrop (overlay rgba), content max-height 80%, padding 16px, border-radius-top 16px
- Handle bar 32×4px abu di atas

### 14. **Badge / Chip**
- Small text 10–11px, padding 2px 6px, border-radius 4px, background muted atau accent

### 15. **Icon Button**
- 40×40 atau 48×48, border-radius 50%, icon center, transparent bg atau light hover

---

## 15. Masalah Wireframe v1 yang Perlu Diperbaiki

### ❌ Masalah Aksesibilitas

1. **Tombol ✕ dan 🔍 di header terlalu kecil**: wireframe tidak specify ukuran, tapi dari spacing terlihat < 40px. **Fix**: pastikan minimal 40×40px tap area.

2. **Pill selector jarak antar pill**: hanya 8px gap, tapi tap area pill tidak jelas. **Fix**: tiap pill minimal 48px width (atau tinggi 36px dengan padding cukup), gap 4–8px.

3. **Kalender cell**: beberapa cell tampak kecil (< 40px). **Fix**: minimal 44×44px per cell, atau 48×48px jika ruang cukup. Angka dan text "50rb" di dalam cell harus tetap readable (10–11px OK, tapi kontras harus cukup).

4. **Bottom nav ikon + label**: label 10px terlalu kecil di beberapa case, tapi masih acceptable jika kontras cukup. **Rekomendasi**: naikkan ke 11px atau sembunyikan label jika ikon jelas (tapi label lebih baik untuk accessibility).

5. **Swipe kartu saldo tanpa instruksi**: user baru tidak tahu harus geser. **Fix**: tambahkan visual cue (dots paging sudah ada ✓, bagus) + text hint "‹ geser: Cash · BCA › " (sudah ada ✓).

6. **Budget bar tanpa label untuk warna**: bar hijau/kuning/merah saja tidak cukup. **Fix**: tambahkan ikon atau text status ("Aman", "Hati-hati", "Melebihi") atau tanda ⚠️ untuk kuning/merah.

7. **Emoji tanpa text alt**: 🍜 Makanan — OK karena ada text "Makanan" di sebelah, tapi pastikan screen reader baca keduanya atau sembunyikan emoji dengan `aria-hidden="true"`.

8. **Transaksi list**: warna merah/hijau saja tanpa tanda +/−. **Fix**: tambahkan tanda (sudah dijelaskan di #4).

### ❌ Masalah Teknis / UX

9. **Form transaksi (screen 4) terlalu panjang**: header + 3 pill + nominal + 5 field + kalkulator 16 tombol = perlu scroll di layar 620px. **Fix**: 
   - Kalkulator di bawah, sticky atau bottom sheet terpisah
   - Atau gunakan slide-up sheet untuk kalkulator (muncul saat fokus nominal)
   - Atau full screen form dengan scroll smooth

10. **Kalkulator posisi**: grid 4×4 di paling bawah form berarti jika user scroll, kalkulator hilang. **Fix**: 
    - Sticky kalkulator di bawah (tapi tutup bottom nav)
    - Atau keyboard virtual + kalkulator overlay (floating)

11. **Transfer screen (5)**: box "Dari" dan "Ke" tidak tampak clickable saat pertama kali (create mode), tapi wireframe tidak tampilkan state "pilih pocket". **Fix**: jika belum pilih, tampilkan "+ Pilih pocket asal" dan "+ Pilih pocket tujuan" dengan border dashed atau CTA jelas.

12. **Tanggal "Hari ini ›"**: tidak jelas apakah bisa pilih masa depan atau masa lalu. **Fix**: label "Tanggal" + date picker jelas, bisa tampilkan tanggal penuh "24 Nov 2026 ›".

13. **Foto transaksi "📷 Tambah"**: tidak ada preview jika foto sudah ditambahkan. **Fix**: tampilkan thumbnail 60×60px setelah upload, bisa tap untuk lihat/hapus.

14. **Kategori & pocket picker**: wireframe hanya tampilkan field "🍜 Makanan ›" tapi tidak tampilkan bottom sheet picker-nya. **Perlu**: desain list picker (bottom sheet) dengan scroll, search jika > 10 item.

15. **Budget "lihat semua ›"**: link muted di kanan atas, tapi tidak jelas clickable. **Fix**: pastikan link punya underline atau beda warna saat fokus.

16. **Dots paging kartu saldo**: bagus, tapi tidak interactive. **Rekomendasi**: tap dot = loncat ke kartu itu (nice to have).

17. **Stats donut chart**: tidak ada legend yang jelas. Wireframe tampilkan "Makanan 38%" tapi tidak ada sorting (terurut dari besar ke kecil? atau alfabetis?). **Fix**: urutkan dari terbesar, tampilkan max 5–7 kategori + "Lainnya".

18. **AI quotes box**: background accent-subtle bagus, tapi quotes butuh variasi (jangan monoton). **Rekomendasi**: rotasi quotes tiap load, atau "Muat quotes baru" button.

19. **Lainnya menu**: semua item sama tinggi, tapi "Backup terakhir 12 Nov" punya info tambahan di kanan. **Fix**: secondary text (muted) di bawah label, bukan di kanan (lebih jelas di layar sempit).

20. **Pocket list (screen 10)**: tidak ada empty state jika pocket kosong. **Fix**: tampilkan "+ Tambah pocket pertama" jika list kosong.

21. **Setting row**: terlalu banyak "›" (10+ baris). **UX**: group setting ke collapsible section atau tabs (Tampilan · Keamanan · Data · Lainnya).

### ⚠️ Hal yang Perlu Validasi di Device Nyata

22. **Bottom nav + FAB overlap gesture bar**: harus test di Android 10+ (Pixel, Samsung OneUI) apakah FAB atau nav tertutup gesture navigation.

23. **Font 10px di kalender**: bisa terlalu kecil di layar 360px dengan density tinggi (xxhdpi). Test readability.

24. **Swipe gesture kartu**: pastikan swipe tidak conflict dengan browser back gesture (edge swipe).

25. **Kalkulator 16 tombol**: button 48×48 × 4 kolom = 192px + gap 6×3 = 210px (wireframe). Di layar 360px, sisakan 20px kiri/kanan = 320px available. 210px cukup, tapi test ergonomi (tombol tidak terlalu berdekatan?).

---

## 16. Checklist Implementasi Wireframe v2

### Must Have
- [x] Target sentuh minimal 48dp semua button, 40dp untuk ikon kecil
- [x] Token warna 8 kategori + kontras WCAG AA per tema
- [x] Tanda +/− untuk pemasukan/pengeluaran, jangan hanya warna
- [x] Format angka Rp25.000 / $4.00 dengan tabular numerals
- [x] Aria label untuk semua button ikon dan interactive element
- [x] Focus visible outline 2px solid accent
- [x] Reduced motion media query
- [x] Safe area inset untuk bottom nav
- [x] Empty / loading / error state design
- [x] Spacing system 4/8/12/16/20/24px
- [x] 15 komponen reusable documented

### Nice to Have
- [ ] Swipe down untuk close bottom sheet
- [ ] Arrow keys untuk navigasi kalender (keyboard)
- [ ] Dots paging interactive (tap = loncat ke kartu)
- [ ] Kalkulator floating overlay (tidak tutup field)

### Perlu Didesain di Wireframe v2
- [ ] Bottom sheet untuk pilih kategori / pocket (list + search)
- [ ] Date picker (kalender kecil atau native input)
- [ ] Foto preview setelah upload
- [ ] Empty state illustration untuk transaksi / pocket / budget kosong
- [ ] Error banner untuk offline / storage penuh / API gagal
- [ ] Loading skeleton untuk list transaksi dan chart
- [ ] Budget bar dengan ikon ⚠️ untuk kuning/merah
- [ ] Setting grouped (collapsible atau tab)

---

**Dibuat**: 27 Nov 2026  
**Untuk**: Wireframe v2 MoniKu PWA  
**Referensi**: PRD.md, wireframe v1 (index.html)
