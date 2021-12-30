import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from '../core/models';
import { AppState } from '../store';
import { selectAllTransaction } from './store/transaction.selectors';
import {
  loadTransactions,
  selectTransaction,
} from './store/transactions.actions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions$!: Observable<Transaction[]>;

  constructor(titleService: Title, private store: Store<AppState>) {
    titleService.setTitle('Transactions | Bankist');
  }

  ngOnInit(): void {
    this.store.dispatch(loadTransactions());
    this.transactions$ = this.store.select(selectAllTransaction);
  }

  onTransactionSelected(transactionId: string) {
    this.store.dispatch(selectTransaction({ transactionId }));
  }
}
