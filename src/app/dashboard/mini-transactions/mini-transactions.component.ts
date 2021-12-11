import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Transaction } from 'src/app/core/models';
import { TransactionsService } from 'src/app/core/services';

@Component({
  selector: 'app-mini-transactions',
  templateUrl: './mini-transactions.component.html',
  styleUrls: ['./mini-transactions.component.scss'],
})
export class MiniTransactionsComponent implements OnInit, OnDestroy {
  dataSource!: MatTableDataSource<Transaction>;
  transactionSub!: Subscription;
  columnsToDisplay = ['account', 'type', 'amount'];

  constructor(
    private transactionsService: TransactionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.transactionSub = this.transactionsService.transactions.subscribe(
      transactions => {
        this.dataSource = new MatTableDataSource(transactions);
      }
    );
  }

  viewTrandactionStatement() {
    this.router.navigate(['transaction-statements']);
  }

  ngOnDestroy(): void {
    this.transactionSub.unsubscribe();
  }
}
