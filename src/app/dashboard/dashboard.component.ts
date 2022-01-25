import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account, AccountOwner, Transaction } from '../core/models';
import { AppState } from '../store';
import { selectIsLoading } from '../store/selectors/loading.selectors';

import * as accountSelectors from '../store/selectors/account.selectors';
import { selectUser } from '../store/selectors/auth.selectors';
import { Router } from '@angular/router';

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

  constructor(
    private store: Store<AppState>,
    private router: Router,
    titleService: Title
  ) {
    titleService.setTitle('Dashboard | Bankist');
  }

  ngOnInit(): void {
    this.accountOwnerInfo$ = this.store.select(selectUser);

    this.accountInfo$ = this.store.select(accountSelectors.selectAccountInfo);

    this.transactions$ = this.store.select(
      accountSelectors.selectRecentTransactions
    );

    this.isAppLoading$ = this.store.select(selectIsLoading);
  }
}
