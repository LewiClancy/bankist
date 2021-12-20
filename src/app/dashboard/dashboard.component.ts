import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account } from '../core/models';
import { TransactionsService } from '../core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  accountInfo$: Observable<Partial<Account>> = of({
    id: 'fjdklaJKlfjaljlfaj',
    float: 102320,
    status: 'active',
  });

  transactions$ = this.transactionsService.transactions;

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {}
}
