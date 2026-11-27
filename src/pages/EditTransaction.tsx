import { TransactionForm } from '../components/TransactionForm';

interface RouteProps {
  path?: string;
  id?: string;
}

export function EditTransaction({ id }: RouteProps) {
  const transactionId = id ? parseInt(id, 10) : undefined;
  
  return (
    <div class="page page-fullscreen">
      <TransactionForm transactionId={transactionId} />
    </div>
  );
}
