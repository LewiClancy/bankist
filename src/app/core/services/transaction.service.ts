import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Transaction } from '../models';

const transactions: Transaction[] = [
  {
    id: '1',
    accountId: 'Lewis Ndungu',
    kind: 'DEPOSIT',
    amount: 4000,
    date: new Date('2001/12/10'),
    message: 'First trial transaction',
  },
  {
    id: '2',
    accountId: 'Lewis Ndungu',
    kind: 'WITHDRAWAL',
    amount: 1000,
    date: new Date('2011/12/10'),
  },
  {
    id: '3',
    accountId: 'Lewis Ndungu',
    kind: 'WITHDRAWAL',
    amount: 3000,
    date: new Date('2002/12/10'),
  },
  {
    id: '4',
    accountId: 'Lewis Ndungu',
    kind: 'DEPOSIT',
    amount: 4000,
    date: new Date('2011/01/15'),
    message: 'I had to pay my bills',
  },
  {
    id: '5',
    accountId: 'Lewis Ndungu',
    kind: 'DEPOSIT',
    amount: 5000,
    date: new Date('2003/12/10'),
  },
  {
    id: '6',
    accountId: 'Agnes Njuiri',
    kind: 'DEPOSIT',
    amount: 6000,
    date: new Date('2004/12/10'),
    message: 'Paid for my book',
  },
  {
    id: '6',
    accountId: 'Thomas shelby',
    kind: 'DEPOSIT',
    amount: 7000,
    date: new Date(),
    message: 'You know',
  },
];

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  constructor() {}

  get transactions() {
    return of(transactions);
  }
}
