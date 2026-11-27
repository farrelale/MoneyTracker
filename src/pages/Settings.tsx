import { useState, useEffect } from 'preact/hooks';
import { db } from '../db/schema';

type Theme = 'system' | 'light' | 'dark';
type Currency = 'IDR' | 'USD';

interface RouteProps {
  path?: string;
}

export function Settings(_props: RouteProps) {
  const [currency, setCurrency] = useState<Currency>('IDR');
  const [periodStartDay, setPeriodStartDay] = useState<number>(25);
  const [theme, setTheme] = useState<Theme>('system');
  
  useEffect(() => {
    loadSettings();
  }, []);
  
  async function loadSettings() {
    const currencySetting = await db.settings.get('currency');
    const periodSetting = await db.settings.get('periodStartDay');
    const themeSetting = await db.settings.get('theme');
    
    if (currencySetting) setCurrency(JSON.parse(currencySetting.value));
    if (periodSetting) setPeriodStartDay(JSON.parse(periodSetting.value));
    if (themeSetting) setTheme(JSON.parse(themeSetting.value));
  }
  
  async function saveSetting(key: string, value: any) {
    await db.settings.put({
      key,
      value: JSON.stringify(value),
      updatedAt: Date.now()
    });
  }
  
  async function handleCurrencyChange(newCurrency: Currency) {
    setCurrency(newCurrency);
    await saveSetting('currency', newCurrency);
  }
  
  async function handlePeriodChange(day: number) {
    setPeriodStartDay(day);
    await saveSetting('periodStartDay', day);
  }
  
  async function handleThemeChange(newTheme: Theme) {
    setTheme(newTheme);
    await saveSetting('theme', newTheme);
    applyTheme(newTheme);
  }
  
  function applyTheme(newTheme: Theme) {
    const root = document.documentElement;
    
    if (newTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('theme-dark', prefersDark);
    } else if (newTheme === 'dark') {
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('theme-dark');
    }
  }
  
  return (
    <div class="page">
      <div class="page-header">
        <h1>Setting</h1>
      </div>
      <div class="page-content settings">
        <div class="setting-group">
          <h2>Tampilan</h2>
          
          <div class="setting-item">
            <label>Tema</label>
            <select value={theme} onChange={(e) => handleThemeChange((e.target as HTMLSelectElement).value as Theme)}>
              <option value="system">Ikut HP</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
        
        <div class="setting-group">
          <h2>Keuangan</h2>
          
          <div class="setting-item">
            <label>Mata Uang</label>
            <select value={currency} onChange={(e) => handleCurrencyChange((e.target as HTMLSelectElement).value as Currency)}>
              <option value="IDR">IDR (Rp)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>
          
          <div class="setting-item">
            <label>Tanggal Mulai Periode</label>
            <input 
              type="number" 
              min="1" 
              max="31" 
              value={periodStartDay}
              onChange={(e) => handlePeriodChange(parseInt((e.target as HTMLInputElement).value))}
            />
            <small>Periode bulanan dimulai tanggal ini setiap bulan</small>
          </div>
        </div>
      </div>
    </div>
  );
}
