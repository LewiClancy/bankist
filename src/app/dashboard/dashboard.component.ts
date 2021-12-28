import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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
export class DashboardComponent implements OnInit, OnDestroy {
  accountOwnerInfo$!: Observable<AccountOwner | undefined>;
  accountInfo$!: Observable<Account | undefined>;
  isAppLoading$!: Observable<boolean>;
  transactions$!: Observable<Transaction[]>;
  isDashboardLoaded!: Subscription;

  constructor(private store: Store<AppState>, titleService: Title) {
    titleService.setTitle('Dashboard | Bankist');
  }

  ngOnInit(): void {
    //Load store only when it is undefined
    this.isDashboardLoaded = this.store
      .select(dashboardSelectors.isDashboardLoaded)
      .subscribe((isLoaded: boolean) => {
        !isLoaded && this.store.dispatch(dashboardEffects.loadAccountOwner());
      });

    this.accountOwnerInfo$ = this.store.select(
      dashboardSelectors.selectAccountOwnerInfo
    );

    this.accountInfo$ = this.store.select(dashboardSelectors.selectAccountInfo);

    this.transactions$ = this.store.select(
      dashboardSelectors.selectAccountTransactions
    );

    this.isAppLoading$ = this.store.select(selectIsLoading);
  }

  ngOnDestroy(): void {
    this.isDashboardLoaded.unsubscribe();
  }
}
