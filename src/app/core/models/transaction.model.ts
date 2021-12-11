export interface Transaction {
  id: string;
  kind: 'WITHDRAWAL' | 'DEPOSIT';
  amount: number;
  date: number;
  accountId: string;
}
