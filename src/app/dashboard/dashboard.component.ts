import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Account, AccountOwner, Transaction } from '../core/models';
import { AppState } from '../store';
import { selectIsLoading } from '../store/selectors/loading.selectors';

import * as accountSelectors from '../store/selectors/account.selectors';
import { selectLoggedInUser } from '../store/selectors/auth.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  accountOwnerInfo$!: Observable<AccountOwner | undefined>;
  accountInfo$!: Observable<Account | undefined>;
  isAppLoading$!: Observable<boolean>;
  transactions$!: Observable<Transaction[]>;
  isDashboardLoaded!: Subscription;

  constructor(private store: Store<AppState>, titleService: Title) {
    titleService.setTitle('Dashboard | Bankist');
  }

  ngOnInit(): void {
    this.accountOwnerInfo$ = this.store.select(selectLoggedInUser);

    this.accountInfo$ = this.store.select(accountSelectors.selectAccountInfo);

    this.transactions$ = this.store.select(
      accountSelectors.selectRecentTransactions
    );

    this.isAppLoading$ = this.store.select(selectIsLoading);
  }
}
