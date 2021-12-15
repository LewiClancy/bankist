import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Transaction } from 'src/app/core/models';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionDetailsComponent implements OnInit {
  transaction$!: Observable<Transaction>;

  detailForm = this.fb.group({
    id: [''],
    accountId: [''],
    date: [''],
    amount: [''],
    kind: [''],
    message: [''],
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getTransaction();
  }

  getTransaction() {
    this.transaction$ = this.route.data.pipe(
      map(data => data['transaction']),
      tap(transaction => {
        this.detailForm.patchValue({
          id: transaction.id,
          accountId: transaction.accountId,
          date: this.transformDate(transaction.date),
          amount: transaction.amount,
          kind: transaction.kind,
          message: transaction?.message ?? 'This transaction has no message',
        });
      })
    );
  }

  transformDate(date: Date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }
}
