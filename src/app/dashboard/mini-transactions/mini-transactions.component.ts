import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  Input,
  OnInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/core/models';

@Component({
  selector: 'app-mini-transactions',
  templateUrl: './mini-transactions.component.html',
  styleUrls: ['./mini-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniTransactionsComponent implements OnInit, DoCheck {
  @Input() transactions: Transaction[] | null = [];

  dataSource!: MatTableDataSource<Transaction>;
  columnsToDisplay = ['account', 'type', 'amount'];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.dataSource = new MatTableDataSource(this.transactions ?? []); //check for undefined and null
  }

  viewTrandactionStatement() {
    this.router.navigate(['transaction-statements']);
  }
}
