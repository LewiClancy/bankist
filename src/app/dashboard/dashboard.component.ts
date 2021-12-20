import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transactions$ = this.transactionsService.transactions;

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {}
}
