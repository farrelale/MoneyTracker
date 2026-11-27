import { useState, useEffect } from 'preact/hooks';
import { db, Category } from '../db/schema';

interface CategoryPickerProps {
  type: 'income' | 'expense';
  onSelect: (category: Category) => void;
  onClose: () => void;
}

export function CategoryPicker({ type, onSelect, onClose }: CategoryPickerProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories();
  }, [type]);

  const loadCategories = async () => {
    const cats = await db.categories
      .where('type')
      .equals(type)
      .and(c => !c.hiddenAt)
      .toArray();
    
    setCategories(cats);
  };

  return (
    <div class="bottom-sheet-overlay" onClick={onClose}>
      <div class="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div class="bottom-sheet-header">
          <h3>Pilih Kategori</h3>
          <button class="btn-close" onClick={onClose}>✕</button>
        </div>
        
        <div class="bottom-sheet-content">
          <div class="category-list">
            {categories.map(category => (
              <div 
                key={category.id} 
                class="category-item"
                onClick={() => onSelect(category)}
              >
                <span class="category-emoji">{category.emoji}</span>
                <span class="category-name">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
