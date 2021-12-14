import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Transaction } from 'src/app/core/models';
import { TransactionsService } from 'src/app/core/services';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit, AfterViewInit {
  dataSource!: MatTableDataSource<Transaction>;
  transactionSub!: Subscription;
  columnsToDisplay = ['date', 'accountId', 'kind', 'amount'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private transactionsService: TransactionsService) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.transactionSub = this.transactionsService.transactions.subscribe(
      transactions => {
        this.dataSource = new MatTableDataSource(transactions);
      }
    );
  }
}
