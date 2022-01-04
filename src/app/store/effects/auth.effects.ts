import { Injectable } from '@angular/core';
import {
  catchError,
  combineLatest,
  EMPTY,
  exhaustMap,
  from,
  of,
  switchMap,
} from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import * as authActions from '../actions/auth.actions';
import { setErrorMessage } from 'src/app/store/actions/alert.actions';
import * as loadingActions from '../../store/actions/loading.actions';
import { getErrorMessage } from 'src/app/core/services';
import { AuthService } from '../../core/services/auth.service';
import { AccountOwner } from 'src/app/core/models';
import { loadAccountInfo } from '../actions/account.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.login),
      exhaustMap(action => {
        this.store.dispatch(loadingActions.startLoading());
        return from(
          this.authService.handleLogin(action.email, action.password)
        ).pipe(
          switchMap(() => {
            return of(loadingActions.stopLoading());
          }),
          catchError(error => {
            this.store.dispatch(loadingActions.stopLoading());
            return of(authActions.loginFailed({ errorCode: error.code }));
          })
        );
      })
    );
  });

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loginSuccess),
      switchMap(({ userId }) => {
        this.store.dispatch(loadingActions.startLoading());
        return of(authActions.loadUserInfo({ userId }));
      })
    );
  });

  loadUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loadUserInfo),
      switchMap(({ userId }) => {
        let userInfo$ = this.authService.loadUserInfo(userId);
        let userImg$ = this.authService
          .loadUserProfileImage(userId)
          .pipe(catchError(() => of(undefined)));

        let user$ = combineLatest([userInfo$, userImg$]);

        return user$.pipe(
          switchMap(([userInfo, userImg]) => {
            let user: AccountOwner = {
              ...userInfo,
              id: userId,
              displayImage: userImg,
            };
            return of(
              authActions.loadUserInfoSuccess({ user }),
              loadAccountInfo({ accountId: user.accountId })
            );
          }),
          catchError(error =>
            of(authActions.loadUserInfoFailed({ errorCode: error.code }))
          )
        );
      })
    );
  });

  loadUserInfoSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.loadUserInfoSuccess),
        switchMap(() => {
          this.store.dispatch(loadingActions.stopLoading());
          return this.router.navigateByUrl('/dashboard');
        })
      );
    },
    { dispatch: false }
  );

  unsuccessfulLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loginFailed, authActions.loadUserInfoFailed),
      switchMap(({ errorCode }) => {
        console.log(errorCode);
        return of(setErrorMessage({ message: getErrorMessage(errorCode) }));
      })
    );
  });

  signOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.signOut),
        switchMap(() => {
          this.authService.handleSignOut();
          this.router.navigateByUrl('/auth/login');
          return of(() => EMPTY);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
}
