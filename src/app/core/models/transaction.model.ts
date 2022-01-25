export interface Transaction {
  id: string;
  kind: 'WITHDRAWAL' | 'DEPOSIT';
  amount: number;
  date: {
    seconds: number;
    nanoseconds?: number;
  };
  account: {
    id: string;
    ownerFirstName: string;
    ownerSurname: string;
  };
  message?: string;
}
