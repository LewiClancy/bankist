import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from 'src/app/auth/store/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {
  returnType!: boolean | UrlTree;

  constructor(store: Store, router: Router) {
    store.select(selectIsLoggedIn).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.returnType = true;
      } else {
        this.returnType = router.createUrlTree(['/auth', 'login']);
      }
    });
  }

  canLoad() {
    return this.returnType;
  }
}
