import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { signOut, successfulLogin } from './store/auth.actions';

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

        this.store.dispatch(successfulLogin({ uid, email }));
      } else {
        this.store.dispatch(signOut());
      }
    });
  }
}
