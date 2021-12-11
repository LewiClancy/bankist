import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/core/models';
import { TransactionsService } from 'src/app/core/services';

@Component({
  selector: 'app-mini-transactions',
  templateUrl: './mini-transactions.component.html',
  styleUrls: ['./mini-transactions.component.scss'],
})
export class MiniTransactionsComponent implements OnInit {
  dataSource!: MatTableDataSource<Transaction>;

  columnsToDisplay = ['account', 'type', 'amount'];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionsService.transactions.subscribe((transactions) => {
      this.dataSource = new MatTableDataSource(transactions);
    });
  }
}
