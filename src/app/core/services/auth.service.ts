import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, from, map, Observable, of } from 'rxjs';
import * as authActions from 'src/app/store/actions/auth.actions';
import { startLoading } from 'src/app/store/actions/loading.actions';
import { AccountOwner, Address } from '../models';
import { convertSnaps } from './firestore-utils.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private store: Store,
    private router: Router
  ) {
    this.handleAuthenticationStatus();
  }

  handleLogin(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  isLoggedIn() {
    return this.afAuth.authState;
  }

  handleAuthenticationStatus() {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.store.dispatch(authActions.autoLoginSuccess({ userId: user.uid }));
        this.store.dispatch(authActions.setAuthentication());
        this.store.dispatch(startLoading());
      } else {
        this.store.dispatch(authActions.resetAuthentication());
      }
    });
  }

  handleSignOut() {
    return this.afAuth
      .signOut()
      .then(() => this.router.navigateByUrl('/login'));
  }

  loadUserInfo(userId: string) {
    const userCollectionRef = `account-owners/${userId}`;
    const user$ = this.afs
      .doc<AccountOwner>(userCollectionRef)
      .snapshotChanges()
      .pipe(
        map(accOwnerSnapshot => {
          return convertSnaps<AccountOwner>(accOwnerSnapshot);
        })
      );

    const userImg$ = this.loadUserProfileImage(userId).pipe(
      catchError(error => {
        console.log(error);
        return of(`../../../assets/images/avatar.png`);
      })
    );

    const userInfo$ = combineLatest([user$, userImg$]);

    return userInfo$.pipe(
      map(([userInfo, displayImage]) => {
        return {
          ...userInfo,
          id: userId,
          displayImage,
        };
      })
    );
  }

  loadUserProfileImage(accountId: string): Observable<string> {
    let imageRef = this.afStorage
      .ref(`display-images/${accountId}`)
      .child(`${accountId}.png`);

    return imageRef.getDownloadURL();
  }

  loadUserAddresses(userId: string) {
    const addressRef = `account-owners/${userId}/addresses`;

    return this.afs.collection<Address>(addressRef).valueChanges();
  }

  setAuthenticationStatus() {
    return this.afAuth.onAuthStateChanged(user => {
      return user
        ? this.store.dispatch(authActions.setAuthentication())
        : this.store.dispatch(authActions.setAuthentication());
    });
  }
}
