import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Transaction } from 'src/app/core/models';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionDetailsComponent implements OnInit {
  transaction$!: Observable<Transaction>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.transaction$ = this.route.data.pipe(map(data => data['transaction']));
  }
}
