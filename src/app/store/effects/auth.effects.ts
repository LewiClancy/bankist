import { Injectable } from '@angular/core';
import { catchError, exhaustMap, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import * as authActions from '../actions/auth.actions';
import * as loadingActions from '../../store/actions/loading.actions';
import { setErrorMessage } from '../../store/actions/alert.actions';
import { getErrorMessage } from '../../core/services';
import { AuthService } from '../../core/services/auth.service';
import { loadAccountInfo } from '../actions/account.actions';

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
                authActions.loginFailed({ errorCode: 'Unknown Error Occured' })
              );
            }
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
      ofType(authActions.loginSuccess, authActions.autoLoginSuccess),
      exhaustMap(({ userId }) => {
        return of(authActions.loadUserInfo({ userId }));
      })
    );
  });

  loadUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loadUserInfo),
      switchMap(({ userId }) => {
        debugger;
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

  loadUserInfoSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.loadUserInfoSuccess),
        switchMap(() => {
          return this.router.navigateByUrl('/dashboard');
        })
      );
    },
    { dispatch: false }
  );

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

  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
}
