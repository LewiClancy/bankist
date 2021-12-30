export interface Transaction {
  id: string;
  kind: 'WITHDRAWAL' | 'DEPOSIT';
  amount: number;
  date: {
    seconds: number;
    nanoseconds?: number;
  };
  accountId: string;
  message?: string;
}
