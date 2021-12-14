export interface Transaction {
  id: string;
  kind: 'WITHDRAWAL' | 'DEPOSIT';
  amount: number;
  date: Date;
  accountId: string;
  message?: string;
}
