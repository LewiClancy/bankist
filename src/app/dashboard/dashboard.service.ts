import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, tap } from 'rxjs/operators';
import { Account, AccountOwner } from '../core/models';
import { convertSnaps } from '../core/services';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private afs: AngularFirestore) {}

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
}
