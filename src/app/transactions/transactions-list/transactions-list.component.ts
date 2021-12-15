import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  Subscription,
  switchMap,
  throttle,
  throttleTime,
} from 'rxjs';
import { Transaction } from 'src/app/core/models';
import { TransactionsService } from 'src/app/core/services';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<Transaction>;
  transactionSub!: Subscription;
  filterSub!: Subscription;
  filterControl = new FormControl();
  columnsToDisplay = ['date', 'accountId', 'kind', 'amount'];

  constructor(private transactionsService: TransactionsService) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.subToDataSource();
    this.handleFilter();
  }

  subToDataSource() {
    this.transactionSub = this.transactionsService.transactions.subscribe(
      transactions => {
        this.dataSource = new MatTableDataSource(transactions);
      }
    );
  }

  handleFilter() {
    this.filterSub = this.filterControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map(filterTerm => filterTerm.trim())
      )
      .subscribe(filterTerm => this.applyFilterToTransactions(filterTerm));
  }

  private applyFilterToTransactions(filterTerm: string) {
    this.dataSource.filter = filterTerm;
  }

  ngOnDestroy(): void {
    this.filterSub.unsubscribe();
  }
}
