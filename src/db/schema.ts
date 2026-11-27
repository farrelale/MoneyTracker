import Dexie, { Table } from 'dexie';

export interface Transaction {
  id?: number;
  type: 'income' | 'expense' | 'transfer';
  amount: number; // integer: IDR dalam rupiah, USD dalam sen
  date: string; // ISO 8601 date string 'YYYY-MM-DD'
  categoryId: number;
  pocketId?: number; // untuk income/expense
  fromPocketId?: number; // untuk transfer
  toPocketId?: number; // untuk transfer
  note: string;
  photoId?: number;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number; // soft-delete
}

export interface Pocket {
  id?: number;
  name: string;
  purpose: 'daily' | 'investment' | 'debt' | 'custom';
  customPurpose?: string;
  description: string;
  emoji: string;
  initialBalance: number; // integer
  createdAt: number;
  archivedAt?: number;
}

export interface Category {
  id?: number;
  name: string;
  emoji: string;
  type: 'income' | 'expense';
  isDefault: boolean;
  hiddenAt?: number;
  createdAt: number;
}

export interface Budget {
  id?: number;
  categoryId: number;
  amount: number; // integer
  createdAt: number;
  updatedAt: number;
}

export interface Setting {
  key: string; // primary key
  value: string; // JSON string atau plain string
  updatedAt: number;
}

export interface Photo {
  id?: number;
  blob: Blob;
  createdAt: number;
}

class MoniKuDB extends Dexie {
  transactions!: Table<Transaction>;
  pockets!: Table<Pocket>;
  categories!: Table<Category>;
  budgets!: Table<Budget>;
  settings!: Table<Setting>;
  photos!: Table<Photo>;

  constructor() {
    super('MoniKuDB');
    this.version(1).stores({
      transactions: '++id, date, type, categoryId, pocketId, fromPocketId, toPocketId, deletedAt',
      pockets: '++id, name, archivedAt',
      categories: '++id, type, hiddenAt',
      budgets: '++id, categoryId',
      settings: 'key',
      photos: '++id'
    });
  }
}

export const db = new MoniKuDB();
