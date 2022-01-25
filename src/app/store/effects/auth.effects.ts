import { Injectable } from '@angular/core';
import { catchError, EMPTY, exhaustMap, of, switchMap } from 'rxjs';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import * as authActions from '../actions/auth.actions';
import * as loadingActions from '../../store/actions/loading.actions';
import { setErrorMessage } from '../../store/actions/alert.actions';
import { getErrorMessage } from '../../core/services';
import { AuthService } from '../../core/services/auth.service';
import { loadAccountInfo } from '../actions/account.actions';
import { selectUserId } from '../selectors/auth.selectors';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.login),
      exhaustMap(({ email, password }) => {
        this.store.dispatch(loadingActions.startLoading());
        return this.authService.handleLogin(email, password).pipe(
          switchMap(({ user }) => {
            if (user) {
              return of(authActions.loginSuccess({ userId: user.uid }));
            } else {
              return of(
                authActions.loginFailed({ errorCode: 'Unknown Error Occured' }),
                loadingActions.stopLoading()
              );
            }
          }),
          catchError(error => {
            return of(
              authActions.loginFailed({ errorCode: error.code }),
              loadingActions.stopLoading()
            );
          })
        );
      })
    );
  });

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loginSuccess, authActions.autoLoginSuccess),
      exhaustMap(({ userId }) => {
        this.router.navigateByUrl('/dashboard');
        return of(authActions.loadUserInfo({ userId }));
      })
    );
  });

  loadUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loadUserInfo),
      switchMap(({ userId }) => {
        return this.authService.loadUserInfo(userId).pipe(
          switchMap(user => {
            return of(authActions.loadUserInfoSuccess({ user }));
          }),
          catchError(error =>
            of(
              authActions.loadUserInfoFailed({ errorCode: error.code }),
              loadingActions.stopLoading()
            )
          )
        );
      })
    );
  });

  loadAccountInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loadUserInfoSuccess),
      switchMap(({ user }) => {
        return of(loadAccountInfo({ accountId: user.accountId }));
      })
    );
  });

  unsuccessfulLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loginFailed, authActions.loadUserInfoFailed),
      switchMap(({ errorCode }) => {
        return of(setErrorMessage({ message: getErrorMessage(errorCode) }));
      })
    );
  });

  signOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.signOut),
        switchMap(() => {
          return of(this.authService.handleSignOut());
        })
      );
    },
    { dispatch: false }
  );

  loadUserAddresses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loadUserAddresses),
      concatLatestFrom(() => this.store.select(selectUserId)),
      switchMap(([action, userId]) => {
        if (!userId)
          return of(
            authActions.loadUserAddressesFailed({ errorCode: 'unknown' })
          );
        return this.authService.loadUserAddresses(userId).pipe(
          switchMap(userAddresses => {
            return of(authActions.loadUserAddressesSuccess({ userAddresses }));
          }),
          catchError(error =>
            of(authActions.loadUserAddressesFailed({ errorCode: error.code }))
          )
        );
      })
    );
  });

  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
}
