import { TransactionForm } from '../components/TransactionForm';

interface RouteProps {
  path?: string;
}

export function AddTransaction(_props: RouteProps) {
  return (
    <div class="page page-fullscreen">
      <TransactionForm />
    </div>
  );
}
