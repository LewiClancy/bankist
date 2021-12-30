import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, map, Subscription } from 'rxjs';
import { Transaction } from 'src/app/core/models';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsListComponent
  implements OnInit, AfterViewInit, OnDestroy, DoCheck
{
  @Input() transactions!: Transaction[] | null;
  @Output() selectTransaction = new EventEmitter<string>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<Transaction>;
  filterSub!: Subscription;

  filterControl = new FormControl();
  columnsToDisplay = ['date', 'accountId', 'kind', 'amount'];

  constructor() {}

  ngDoCheck(): void {
    //force change detection on this @input
    this.dataSource = new MatTableDataSource(this.transactions ?? []);
  }

  ngOnInit(): void {
    this.handleFilter();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private handleFilter() {
    this.filterSub = this.filterControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map(filterTerm => filterTerm.trim())
      )
      .subscribe(filterTerm => (this.dataSource.filter = filterTerm));
  }

  onTransactionSelected(transacionId: string) {
    this.selectTransaction.emit(transacionId);
  }

  ngOnDestroy(): void {
    this.filterSub.unsubscribe();
  }
}
