import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account, AccountOwner, Transaction } from '../core/models';
import { AppState } from '../store';
import { selectIsLoading } from '../store/selectors/loading.selectors';

import * as dashboardEffects from './store/dashboard.actions';
import * as dashboardSelectors from './store/dashboard.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  accountOwnerInfo$!: Observable<AccountOwner | undefined>;

  accountInfo$!: Observable<Account | undefined>;

  transactions$!: Observable<Transaction[]>;

  isLoading$!: Observable<boolean>;

  constructor(private store: Store<AppState>, titleService: Title) {
    titleService.setTitle('Dashboard | Bankist');
  }

  ngOnInit(): void {
    console.log('initialized');

    this.store.dispatch(dashboardEffects.loadAccountOwner());

    this.accountOwnerInfo$ = this.store.select(
      dashboardSelectors.selectAccountOwnerInfo
    );

    this.accountInfo$ = this.store.select(dashboardSelectors.selectAccountInfo);

    this.transactions$ = this.store.select(
      dashboardSelectors.selectAccountTransactions
    );

    this.isLoading$ = this.store.select(selectIsLoading);
  }
}
