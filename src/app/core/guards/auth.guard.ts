import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from 'src/app/store/selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {
  returnType!: boolean | UrlTree;

  constructor(store: Store, router: Router) {
    store.select(selectIsLoggedIn).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.returnType = true;
      } else {
        this.returnType = router.createUrlTree(['login']);
      }
    });
  }

  canLoad() {
    return this.returnType;
  }
}
