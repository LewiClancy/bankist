import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Transaction } from '../core/models';
import { convertSnaps } from '../core/services';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  constructor(private afs: AngularFirestore) {}

  loadTransactions(accountId: string): Observable<Transaction[]> {
    const ref = `accounts/${accountId}/transactions`;
    const tnxCollection = this.afs.collection<Transaction>(ref);
    return tnxCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const actionDoc = action.payload.doc;
          const transaction: Transaction = {
            ...(<Transaction>actionDoc.data()),
            id: actionDoc.id,
          };
          return transaction;
        });
      })
    );
  }
}
