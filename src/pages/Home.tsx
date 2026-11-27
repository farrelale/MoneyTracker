import { useState, useEffect } from 'preact/hooks';
import { db, Pocket } from '../db/schema';
import { calculatePocketBalance } from '../utils/balance';
import { formatNumber } from '../utils/calculator';

interface RouteProps {
  path?: string;
}

interface PocketWithBalance extends Pocket {
  balance: number;
}

export function Home(_props: RouteProps) {
  const [pockets, setPockets] = useState<PocketWithBalance[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadBalances();
  }, []);

  const loadBalances = async () => {
    setLoading(true);
    
    // Ambil semua pocket yang tidak diarsip
    const allPockets = await db.pockets.filter(p => !p.archivedAt).toArray();
    
    // Hitung saldo setiap pocket
    const pocketsWithBalance: PocketWithBalance[] = [];
    let total = 0;
    
    for (const pocket of allPockets) {
      const balance = await calculatePocketBalance(pocket.id!);
      pocketsWithBalance.push({ ...pocket, balance });
      total += balance;
    }
    
    setPockets(pocketsWithBalance);
    setTotalBalance(total);
    setLoading(false);
  };

  const handlePrevCard = () => {
    setCurrentIndex(prev => (prev === 0 ? pockets.length : prev - 1));
  };

  const handleNextCard = () => {
    setCurrentIndex(prev => (prev === pockets.length ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div class="page">
        <div class="page-header">
          <h1>Home</h1>
          <p>Selamat datang di MoniKu</p>
        </div>
        <div class="loading">
          <p>Memuat data...</p>
        </div>
      </div>
    );
  }

  const displayBalance = currentIndex === 0 ? totalBalance : pockets[currentIndex - 1]?.balance || 0;
  const displayTitle = currentIndex === 0 ? 'Total Semua' : pockets[currentIndex - 1]?.name || '';
  const displayEmoji = currentIndex === 0 ? '💰' : pockets[currentIndex - 1]?.emoji || '';

  return (
    <div class="page">
      <div class="page-header">
        <h1>Home</h1>
        <p>Selamat datang di MoniKu</p>
      </div>
      
      <div class="page-content">
        {/* Balance Card Slider */}
        <div class="balance-card-container">
          <button 
            class="card-nav-btn left" 
            onClick={handlePrevCard}
            disabled={pockets.length === 0}
          >
            ‹
          </button>
          
          <div class="balance-card">
            <div class="balance-card-title">
              <span class="balance-emoji">{displayEmoji}</span>
              <span>{displayTitle}</span>
            </div>
            <div class="balance-amount">
              Rp {formatNumber(displayBalance)}
            </div>
            <div class="balance-card-dots">
              {[...Array(pockets.length + 1)].map((_, i) => (
                <span 
                  key={i} 
                  class={`dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
          </div>
          
          <button 
            class="card-nav-btn right" 
            onClick={handleNextCard}
            disabled={pockets.length === 0}
          >
            ›
          </button>
        </div>

        {/* Pocket List Summary */}
        <div class="home-section">
          <h2>Pocket</h2>
          <div class="pocket-summary-list">
            {pockets.length === 0 ? (
              <p class="text-muted">Belum ada pocket</p>
            ) : (
              pockets.map(pocket => (
                <div key={pocket.id} class="pocket-summary-item">
                  <span class="pocket-emoji">{pocket.emoji}</span>
                  <span class="pocket-name">{pocket.name}</span>
                  <span class={`pocket-balance ${pocket.balance < 0 ? 'negative' : ''}`}>
                    Rp {formatNumber(pocket.balance)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Period Summary - akan diisi di fase berikutnya */}
        <div class="home-section">
          <h2>Periode Ini</h2>
          <p class="text-muted">Ringkasan periode akan ditampilkan di versi berikutnya</p>
        </div>
      </div>
    </div>
  );
}
