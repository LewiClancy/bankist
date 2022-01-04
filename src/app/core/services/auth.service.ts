import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import {
  loginSuccess,
  setAuthStatus,
} from 'src/app/store/actions/auth.actions';
import { AccountOwner } from '../models';
import { convertSnaps } from './firestore-utils.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private store: Store
  ) {
    this.handleAuthStateChange();
  }

  handleLogin(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  handleSignOut() {
    return this.afAuth.signOut();
  }

  handleAuthStateChange() {
    //Handle automatic signIns
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        let email = user.email;
        let uid = user.uid;
        this.store.dispatch(setAuthStatus({ uid, email }));
        this.store.dispatch(loginSuccess({ userId: uid }));
      }
    });
  }

  loadUserInfo(ownerId: string) {
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

  loadUserProfileImage(accountId: string): Observable<string> {
    let ref = this.afStorage
      .ref(`display-images/${accountId}`)
      .child(`${accountId}.png`);

    return ref.getDownloadURL();
  }
}
