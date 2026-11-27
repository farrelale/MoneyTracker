import { render } from 'preact';
import { App } from './app';
import { seedDatabase } from './db/seed';
import './styles/main.css';

// Initialize database dengan seed data
seedDatabase().then(() => {
  console.log('Database initialized');
});

// Apply theme
const savedTheme = localStorage.getItem('theme') || 'system';
if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('theme-dark');
}

render(<App />, document.getElementById('app')!);
