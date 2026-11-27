import { useState } from 'preact/hooks';
import Router from 'preact-router';
import { Home } from './pages/Home';
import { Transactions } from './pages/Transactions';
import { AddTransaction } from './pages/AddTransaction';
import { EditTransaction } from './pages/EditTransaction';
import { Stats } from './pages/Stats';
import { Pockets } from './pages/Pockets';
import { More } from './pages/More';
import { Settings } from './pages/Settings';
import { BottomNav } from './components/BottomNav';
import { FloatingAddButton } from './components/FloatingAddButton';

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
          <AddTransaction path="/transactions/add" />
          <EditTransaction path="/transactions/edit/:id" />
          <Stats path="/stats" />
          <Pockets path="/pockets" />
          <More path="/more" />
          <Settings path="/settings" />
        </Router>
      </main>
      <FloatingAddButton currentPath={currentPath} />
      <BottomNav currentPath={currentPath} />
    </div>
  );
}
