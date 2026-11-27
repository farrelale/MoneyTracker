import { useState, useEffect } from 'preact/hooks';
import { db, Pocket } from '../db/schema';

interface PocketPickerProps {
  excludePocketId?: number;
  onSelect: (pocket: Pocket) => void;
  onClose: () => void;
}

export function PocketPicker({ excludePocketId, onSelect, onClose }: PocketPickerProps) {
  const [pockets, setPockets] = useState<Pocket[]>([]);

  useEffect(() => {
    loadPockets();
  }, [excludePocketId]);

  const loadPockets = async () => {
    let query = db.pockets.filter(p => !p.archivedAt);
    
    const pocketsArray = await query.toArray();
    
    // Filter exclude jika ada
    const filtered = excludePocketId 
      ? pocketsArray.filter(p => p.id !== excludePocketId)
      : pocketsArray;
    
    setPockets(filtered);
  };

  return (
    <div class="bottom-sheet-overlay" onClick={onClose}>
      <div class="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div class="bottom-sheet-header">
          <h3>Pilih Pocket</h3>
          <button class="btn-close" onClick={onClose}>✕</button>
        </div>
        
        <div class="bottom-sheet-content">
          <div class="pocket-list">
            {pockets.map(pocket => (
              <div 
                key={pocket.id} 
                class="pocket-item"
                onClick={() => onSelect(pocket)}
              >
                <span class="pocket-emoji">{pocket.emoji}</span>
                <div class="pocket-info">
                  <span class="pocket-name">{pocket.name}</span>
                  <span class="pocket-purpose">{pocket.purpose}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
