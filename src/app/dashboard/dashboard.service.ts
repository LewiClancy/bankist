import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Account, AccountOwner, Transaction } from '../core/models';
import { convertSnaps } from '../core/services';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {}

  loadAccountOwner(ownerId: string) {
    return this.afs
      .collection('account-owners')
      .doc<AccountOwner>(ownerId)
      .snapshotChanges()
      .pipe(
        map(accOwnerSnapshot => {
          return convertSnaps<AccountOwner>(accOwnerSnapshot);
        })
      );
  }

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

  loadAccountTransactions(accountId: string) {
    return this.afs
      .collection<Transaction>(`accounts/${accountId}/transactions`)
      .valueChanges();
  }

  loadUserProfileImage(accountId: string): Observable<string> {
    let ref = this.afStorage
      .ref(`display-images/${accountId}`)
      .child(`${accountId}.png`);

    return ref.getDownloadURL();
  }
}
