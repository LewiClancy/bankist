import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AccountOwner, Address } from '../core/models';

@Injectable()
export class UserInfoService {
  constructor(private afs: AngularFirestore) {}

  updateUserInfo(userId: string, userInfo: AccountOwner) {
    const ref = `account-owners/${userId}`;

    return this.afs.doc<AccountOwner>(ref).update(userInfo);
    // write the new user info
  }

  updateAddresses(userId: string, addresses: Address[]) {
    const ref = `account-owners/${userId}/addresses`;

    // this.afs.
    // write the new address information
  }
}
