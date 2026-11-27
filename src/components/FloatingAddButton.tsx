import { route } from 'preact-router';

interface FloatingAddButtonProps {
  currentPath: string;
}

export function FloatingAddButton({ currentPath }: FloatingAddButtonProps) {
  // Hanya tampil di Home dan Transactions
  const shouldShow = currentPath === '/' || currentPath === '/transactions';
  
  if (!shouldShow) {
    return null;
  }

  const handleClick = () => {
    route('/transactions/add');
  };

  return (
    <button class="fab" onClick={handleClick} aria-label="Tambah transaksi">
      <span class="fab-icon">+</span>
    </button>
  );
}
