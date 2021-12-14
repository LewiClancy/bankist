import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Transaction } from './../models';
import { TransactionsService } from './../services';

@Injectable({ providedIn: 'root' })
export class TransactionResolver implements Resolve<Transaction | undefined> {
  resolve(route: ActivatedRouteSnapshot): Transaction | undefined {
    const transId = route.paramMap.get('id');

    if (!transId) return undefined;

    const transaction = this.transactionsService.getTransactionById(transId);
    console.log(transaction);

    if (transaction) {
      return transaction;
    } else {
      return undefined;
    }
  }

  constructor(
    private transactionsService: TransactionsService,
    private router: Router
  ) {}
}
