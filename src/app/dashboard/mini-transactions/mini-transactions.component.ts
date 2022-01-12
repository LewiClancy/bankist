import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/core/models';

@Component({
  selector: 'app-mini-transactions',
  templateUrl: './mini-transactions.component.html',
  styleUrls: ['./mini-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniTransactionsComponent implements OnInit, DoCheck {
  @Input() transactions: Transaction[] | null = [];
  @Output() viewTransactions = new EventEmitter();

  dataSource!: MatTableDataSource<Transaction>;
  columnsToDisplay = ['account', 'type', 'amount'];

  constructor() {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    //force change detection on this @input
    this.dataSource = new MatTableDataSource(this.transactions ?? []);
  }
}
