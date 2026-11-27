import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { db, Category, Pocket, Transaction } from '../db/schema';
import { evaluateExpression, formatNumber } from '../utils/calculator';
import { CategoryPicker } from './CategoryPicker';
import { PocketPicker } from './PocketPicker';

interface TransactionFormProps {
  transactionId?: number;
}

export function TransactionForm({ transactionId }: TransactionFormProps) {
  const [type, setType] = useState<'expense' | 'income' | 'transfer'>('expense');
  const [expression, setExpression] = useState('');
  const [amount, setAmount] = useState(0);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [pocketId, setPocketId] = useState<number | null>(null);
  const [fromPocketId, setFromPocketId] = useState<number | null>(null);
  const [toPocketId, setToPocketId] = useState<number | null>(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showPocketPicker, setShowPocketPicker] = useState(false);
  const [showFromPocketPicker, setShowFromPocketPicker] = useState(false);
  const [showToPocketPicker, setShowToPocketPicker] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedPocket, setSelectedPocket] = useState<Pocket | null>(null);
  const [selectedFromPocket, setSelectedFromPocket] = useState<Pocket | null>(null);
  const [selectedToPocket, setSelectedToPocket] = useState<Pocket | null>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isTransferLocked, setIsTransferLocked] = useState(false);

  // Load default category dan pocket terakhir digunakan
  useEffect(() => {
    loadDefaults();
    if (transactionId) {
      loadTransaction();
    }
  }, [transactionId]);

  // Load data transaksi yang akan diedit
  const loadTransaction = async () => {
    if (!transactionId) return;
    
    const tx = await db.transactions.get(transactionId);
    if (!tx) return;

    setIsEditing(true);
    setType(tx.type);
    setAmount(tx.amount);
    setExpression(tx.amount.toString());
    setDate(tx.date);
    setNote(tx.note);

    if (tx.type === 'transfer') {
      setFromPocketId(tx.fromPocketId!);
      setToPocketId(tx.toPocketId!);
      setIsTransferLocked(true);
      
      const fromPocket = await db.pockets.get(tx.fromPocketId!);
      const toPocket = await db.pockets.get(tx.toPocketId!);
      setSelectedFromPocket(fromPocket || null);
      setSelectedToPocket(toPocket || null);
    } else {
      setCategoryId(tx.categoryId);
      setPocketId(tx.pocketId!);
      
      const category = await db.categories.get(tx.categoryId);
      const pocket = await db.pockets.get(tx.pocketId!);
      setSelectedCategory(category || null);
      setSelectedPocket(pocket || null);
    }
  };

  const loadDefaults = async () => {
    // Ambil kategori terakhir digunakan
    const lastTransaction = await db.transactions
      .orderBy('createdAt')
      .reverse()
      .first();
    
    if (lastTransaction && lastTransaction.categoryId) {
      setCategoryId(lastTransaction.categoryId);
      const cat = await db.categories.get(lastTransaction.categoryId);
      setSelectedCategory(cat || null);
    }

    // Ambil pocket default (Cash atau pocket pertama)
    const cashPocket = await db.pockets.filter(p => p.name === 'Cash' && !p.archivedAt).first();
    if (cashPocket) {
      setPocketId(cashPocket.id!);
      setFromPocketId(cashPocket.id!);
      setSelectedPocket(cashPocket);
      setSelectedFromPocket(cashPocket);
    } else {
      const firstPocket = await db.pockets.filter(p => !p.archivedAt).first();
      if (firstPocket) {
        setPocketId(firstPocket.id!);
        setFromPocketId(firstPocket.id!);
        setSelectedPocket(firstPocket);
        setSelectedFromPocket(firstPocket);
      }
    }
  };

  // Update amount saat expression berubah
  useEffect(() => {
    try {
      const result = evaluateExpression(expression);
      setAmount(result);
    } catch (e) {
      // Jika error, tetap tampilkan expression tapi amount = 0
      setAmount(0);
    }
  }, [expression]);

  const handleKeypad = (value: string) => {
    if (value === '⌫') {
      setExpression(prev => prev.slice(0, -1));
    } else if (value === '000') {
      setExpression(prev => prev + '000');
    } else {
      setExpression(prev => prev + value);
    }
  };

  const handleSave = async () => {
    if (amount === 0) return;

    if (type === 'transfer') {
      if (!fromPocketId || !toPocketId || fromPocketId === toPocketId) {
        alert('Pilih pocket yang berbeda untuk transfer');
        return;
      }
    } else {
      if (!categoryId || !pocketId) {
        alert('Pilih kategori dan pocket terlebih dahulu');
        return;
      }
    }

    const now = Date.now();
    
    const transaction: Transaction = {
      type,
      amount,
      date,
      categoryId: type === 'transfer' ? 1 : categoryId!, // Transfer pakai dummy category
      pocketId: type !== 'transfer' ? pocketId! : undefined,
      fromPocketId: type === 'transfer' ? fromPocketId! : undefined,
      toPocketId: type === 'transfer' ? toPocketId! : undefined,
      note,
      createdAt: isEditing ? (await db.transactions.get(transactionId!))!.createdAt : now,
      updatedAt: now
    };

    if (isEditing && transactionId) {
      await db.transactions.update(transactionId, transaction);
    } else {
      await db.transactions.add(transaction);
    }

    route('/transactions');
  };

  const handleDelete = async () => {
    if (!transactionId) return;
    
    const confirmed = confirm('Hapus transaksi ini?');
    if (!confirmed) return;

    await db.transactions.delete(transactionId);
    route('/transactions');
  };

  const canSave = amount > 0 && (
    type === 'transfer' 
      ? (fromPocketId && toPocketId && fromPocketId !== toPocketId)
      : (categoryId && pocketId)
  );

  return (
    <div class="transaction-form">
      <div class="form-header">
        <button class="btn-close" onClick={() => route('/transactions')}>✕</button>
        <h2>{isEditing ? 'Edit Transaksi' : 'Tambah Transaksi'}</h2>
        <button 
          class={`btn-save ${canSave ? '' : 'disabled'}`}
          onClick={handleSave}
          disabled={!canSave}
        >
          Simpan
        </button>
      </div>

      {/* Tabs */}
      <div class="form-tabs">
        <button 
          class={`tab ${type === 'expense' ? 'active' : ''}`}
          onClick={() => !isEditing && setType('expense')}
          disabled={isEditing}
        >
          Keluar
        </button>
        <button 
          class={`tab ${type === 'income' ? 'active' : ''}`}
          onClick={() => !isEditing && setType('income')}
          disabled={isEditing}
        >
          Masuk
        </button>
        <button 
          class={`tab ${type === 'transfer' ? 'active' : ''}`}
          onClick={() => !isEditing && setType('transfer')}
          disabled={isEditing}
        >
          Transfer
        </button>
      </div>

      {/* Amount Display */}
      <div class="amount-display">
        <div class="expression">{expression || '0'}</div>
        <div class="amount">Rp {formatNumber(amount)}</div>
      </div>

      {/* Fields */}
      <div class="form-fields">
        {type === 'transfer' ? (
          <>
            <div class="field-item" onClick={() => !isTransferLocked && setShowFromPocketPicker(true)}>
              <label>Dari</label>
              <div class="field-value">
                {selectedFromPocket ? (
                  <span>{selectedFromPocket.emoji} {selectedFromPocket.name}</span>
                ) : (
                  <span class="placeholder">Pilih pocket asal</span>
                )}
              </div>
              {isTransferLocked && <small class="text-muted">Pocket tidak bisa diubah</small>}
            </div>
            
            <div class="transfer-arrow">⬇️</div>
            
            <div class="field-item" onClick={() => !isTransferLocked && setShowToPocketPicker(true)}>
              <label>Ke</label>
              <div class="field-value">
                {selectedToPocket ? (
                  <span>{selectedToPocket.emoji} {selectedToPocket.name}</span>
                ) : (
                  <span class="placeholder">Pilih pocket tujuan</span>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div class="field-item" onClick={() => setShowCategoryPicker(true)}>
              <label>Kategori</label>
              <div class="field-value">
                {selectedCategory ? (
                  <span>{selectedCategory.emoji} {selectedCategory.name}</span>
                ) : (
                  <span class="placeholder">Pilih kategori</span>
                )}
              </div>
            </div>

            <div class="field-item" onClick={() => setShowPocketPicker(true)}>
              <label>Pocket</label>
              <div class="field-value">
                {selectedPocket ? (
                  <span>{selectedPocket.emoji} {selectedPocket.name}</span>
                ) : (
                  <span class="placeholder">Pilih pocket</span>
                )}
              </div>
            </div>
          </>
        )}

        <div class="field-item">
          <label>Tanggal</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate((e.target as HTMLInputElement).value)}
            class="date-input"
          />
        </div>

        <div class="field-item">
          <label>Catatan (opsional)</label>
          <input 
            type="text" 
            value={note} 
            onInput={(e) => setNote((e.target as HTMLInputElement).value)}
            placeholder="Tambah catatan..."
            class="note-input"
          />
        </div>
      </div>

      {/* Keypad */}
      <div class="keypad">
        <div class="keypad-row">
          <button onClick={() => handleKeypad('7')}>7</button>
          <button onClick={() => handleKeypad('8')}>8</button>
          <button onClick={() => handleKeypad('9')}>9</button>
          <button onClick={() => handleKeypad('/')} class="operator">÷</button>
        </div>
        <div class="keypad-row">
          <button onClick={() => handleKeypad('4')}>4</button>
          <button onClick={() => handleKeypad('5')}>5</button>
          <button onClick={() => handleKeypad('6')}>6</button>
          <button onClick={() => handleKeypad('*')} class="operator">×</button>
        </div>
        <div class="keypad-row">
          <button onClick={() => handleKeypad('1')}>1</button>
          <button onClick={() => handleKeypad('2')}>2</button>
          <button onClick={() => handleKeypad('3')}>3</button>
          <button onClick={() => handleKeypad('-')} class="operator">−</button>
        </div>
        <div class="keypad-row">
          <button onClick={() => handleKeypad('000')}>000</button>
          <button onClick={() => handleKeypad('0')}>0</button>
          <button onClick={() => handleKeypad('⌫')} class="operator">⌫</button>
          <button onClick={() => handleKeypad('+')} class="operator">+</button>
        </div>
      </div>

      {isEditing && (
        <button class="btn-delete" onClick={handleDelete}>
          Hapus Transaksi
        </button>
      )}

      {/* Bottom Sheets */}
      {showCategoryPicker && (
        <CategoryPicker
          type={type as 'income' | 'expense'}
          onSelect={(category) => {
            setSelectedCategory(category);
            setCategoryId(category.id!);
            setShowCategoryPicker(false);
          }}
          onClose={() => setShowCategoryPicker(false)}
        />
      )}

      {showPocketPicker && (
        <PocketPicker
          onSelect={(pocket) => {
            setSelectedPocket(pocket);
            setPocketId(pocket.id!);
            setShowPocketPicker(false);
          }}
          onClose={() => setShowPocketPicker(false)}
        />
      )}

      {showFromPocketPicker && (
        <PocketPicker
          onSelect={(pocket) => {
            setSelectedFromPocket(pocket);
            setFromPocketId(pocket.id!);
            setShowFromPocketPicker(false);
          }}
          onClose={() => setShowFromPocketPicker(false)}
        />
      )}

      {showToPocketPicker && (
        <PocketPicker
          excludePocketId={fromPocketId || undefined}
          onSelect={(pocket) => {
            setSelectedToPocket(pocket);
            setToPocketId(pocket.id!);
            setShowToPocketPicker(false);
          }}
          onClose={() => setShowToPocketPicker(false)}
        />
      )}
    </div>
  );
}
