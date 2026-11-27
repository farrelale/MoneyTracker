import { route } from 'preact-router';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/transactions', label: 'Transaksi', icon: '📋' },
  { path: '/stats', label: 'Stats', icon: '📊' },
  { path: '/pockets', label: 'Pocket', icon: '👛' },
  { path: '/more', label: 'Lainnya', icon: '⚙️' }
];

interface BottomNavProps {
  currentPath: string;
}

export function BottomNav({ currentPath }: BottomNavProps) {
  return (
    <nav class="bottom-nav">
      {navItems.map(item => (
        <button
          key={item.path}
          class={`nav-item ${currentPath === item.path ? 'active' : ''}`}
          onClick={() => route(item.path)}
        >
          <span class="nav-icon">{item.icon}</span>
          <span class="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
