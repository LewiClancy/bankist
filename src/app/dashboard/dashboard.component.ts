import { Component, OnInit } from '@angular/core';
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
  // accountOwnerInfo$: Observable<Partial<AccountOwner>> = of({
  //   firstName: 'Lewis',
  //   surname: "Ndung'u",
  //   photoUrl: '../../assets/images/image-jeremy.png',
  // });

  accountOwnerInfo$!: Observable<AccountOwner | undefined>;
  // accountInfo$: Observable<Partial<Account>> = of({
  //   id: 'fjdklaJKlfjaljlfaj',
  //   float: 102320,
  //   status: 'active',
  // });

  accountInfo$!: Observable<Account | undefined>;

  // transactions$ = this.transactionsService.transactions;
  transactions$!: Observable<Transaction[]>;

  isLoading$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(dashboardEffects.loadAccountOwner());

    this.isLoading$ = this.store.select(selectIsLoading);

    this.accountOwnerInfo$ = this.store.select(
      dashboardSelectors.selectAccountOwnerInfo
    );

    this.accountInfo$ = this.store.select(dashboardSelectors.selectAccountInfo);

    this.transactions$ = this.store.select(
      dashboardSelectors.selectAccountTransactions
    );
  }
}
