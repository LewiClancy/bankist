import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { setAuthStatus } from 'src/app/store/actions/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private store: Store) {
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
      }
    });
  }
}
