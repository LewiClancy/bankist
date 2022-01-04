import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Account, Transaction } from '../models';
import { convertSnaps } from './firestore-utils.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private afs: AngularFirestore) {}

  loadAccountInfo(accountId: string) {
    return this.afs
      .collection('/accounts')
      .doc<Account>(accountId)
      .snapshotChanges()
      .pipe(
        map(accountSnapshot => {
          return convertSnaps<Account>(accountSnapshot);
        })
      );
  }

  loadRecentTransactions(accountId: string) {
    let collectionRef = `accounts/${accountId}/transactions`;

    return this.afs
      .collection<Transaction>(collectionRef, ref => {
        ref.limit(10);
        ref.orderBy('date');
        return ref;
      }) //querry ten recent transactions
      .valueChanges();
  }
}
