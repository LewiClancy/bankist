import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}
  canActivate() {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          return this.router.createUrlTree(['login']);
        }
      })
    );
  }

  canLoad() {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          return this.router.createUrlTree(['login']);
        }
      })
    );
  }
}
