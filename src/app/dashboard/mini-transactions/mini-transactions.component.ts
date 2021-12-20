import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/core/models';

@Component({
  selector: 'app-mini-transactions',
  templateUrl: './mini-transactions.component.html',
  styleUrls: ['./mini-transactions.component.scss'],
})
export class MiniTransactionsComponent implements OnInit {
  @Input() transactions: Transaction[] | null = [];

  dataSource!: MatTableDataSource<Transaction>;
  columnsToDisplay = ['account', 'type', 'amount'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.transactions ?? []); //check for undefined
  }

  viewTrandactionStatement() {
    this.router.navigate(['transaction-statements']);
  }
}
