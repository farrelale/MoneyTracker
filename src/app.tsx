import { useState } from 'preact/hooks';
import Router from 'preact-router';
import { Home } from './pages/Home';
import { Transactions } from './pages/Transactions';
import { Stats } from './pages/Stats';
import { Pockets } from './pages/Pockets';
import { More } from './pages/More';
import { Settings } from './pages/Settings';
import { BottomNav } from './components/BottomNav';

export function App() {
  const [currentPath, setCurrentPath] = useState('/');
  
  const handleRoute = (e: any) => {
    setCurrentPath(e.url);
  };
  
  return (
    <div class="app">
      <main class="main-content">
        <Router onChange={handleRoute}>
          <Home path="/" />
          <Transactions path="/transactions" />
          <Stats path="/stats" />
          <Pockets path="/pockets" />
          <More path="/more" />
          <Settings path="/settings" />
        </Router>
      </main>
      <BottomNav currentPath={currentPath} />
    </div>
  );
}
