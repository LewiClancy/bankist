import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Transaction } from '../models';

const transactions: Transaction[] = [
  {
    id: '1',
    accountId: 'Lewis Ndungu',
    kind: 'DEPOSIT',
    amount: 4000,
    date: new Date().getTime(),
  },
  {
    id: '2',
    accountId: 'Lewis Ndungu',
    kind: 'WITHDRAWAL',
    amount: 4000,
    date: new Date().getTime(),
  },
  {
    id: '3',
    accountId: 'Lewis Ndungu',
    kind: 'WITHDRAWAL',
    amount: 4000,
    date: new Date().getTime(),
  },
  {
    id: '4',
    accountId: 'Lewis Ndungu',
    kind: 'DEPOSIT',
    amount: 4000,
    date: new Date().getTime(),
  },
  {
    id: '5',
    accountId: 'Lewis Ndungu',
    kind: 'DEPOSIT',
    amount: 4000,
    date: new Date().getTime(),
  },
  {
    id: '6',
    accountId: 'Lewis Ndungu',
    kind: 'DEPOSIT',
    amount: 4000,
    date: new Date().getTime(),
  },
];

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  constructor() {}

  get transactions() {
    return of(transactions);
  }
}
