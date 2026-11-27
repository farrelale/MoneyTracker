import { TransactionList } from '../components/TransactionList';

interface RouteProps {
  path?: string;
}

export function Transactions(_props: RouteProps) {
  return (
    <div class="page">
      <div class="page-header">
        <h1>Transaksi</h1>
        <p>Daftar semua transaksi</p>
      </div>
      <div class="page-content">
        <TransactionList />
      </div>
    </div>
  );
}
