import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Account, AccountOwner } from '../core/models';
import { TransactionsService } from '../core/services';
import { AppState } from '../store';

import * as dashboardEffects from './store/dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  accountOwnerInfo$: Observable<Partial<AccountOwner>> = of({
    firstName: 'Lewis',
    surname: "Ndung'u",
    photoUrl: '../../assets/images/image-jeremy.png',
  });

  accountInfo$: Observable<Partial<Account>> = of({
    id: 'fjdklaJKlfjaljlfaj',
    float: 102320,
    status: 'active',
  });

  transactions$ = this.transactionsService.transactions;

  constructor(
    private transactionsService: TransactionsService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(dashboardEffects.loadAccountOwner());
  }
}
