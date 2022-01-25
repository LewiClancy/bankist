import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Transaction } from 'src/app/core/models';
import { AppState } from 'src/app/store';
import { selectSelectedTransaction } from '../store/transaction.selectors';
import { clearSelectedTransaction } from '../store/transactions.actions';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionDetailsComponent implements OnInit {
  transactionSub!: Subscription;
  detailForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.detailForm = this.fb.group({
      id: [''],
      accountId: [''],
      date: [''],
      amount: [''],
      kind: [''],
      message: [''],
    });

    this.getTransactionDetails();
  }

  private getTransactionDetails() {
    this.transactionSub = this.store
      .select(selectSelectedTransaction)
      .subscribe(transaction => {
        if (transaction) {
          this.updateDetailsForm(transaction);
        } else {
          this.router.navigate(['../'], { relativeTo: this.route });
        }
      });
  }

  private updateDetailsForm(transaction: Transaction) {
    this.detailForm.patchValue({
      id: transaction.id,
      accountId: `${transaction.account.ownerFirstName} ${transaction.account.ownerSurname}`,
      amount: transaction.amount,
      kind: transaction.kind,
      message: transaction?.message ?? 'This transaction has no message',
      date: this.transformDate(
        transaction.date.seconds,
        transaction.date.nanoseconds
      ),
    });
  }

  transformDate(seconds: number, nanoseconds: number = 0) {
    const date = new Date(seconds * 1000 + nanoseconds);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  onClose() {
    this.store.dispatch(clearSelectedTransaction());
  }
}
