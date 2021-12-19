import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, from, of, switchMap } from 'rxjs';
import * as authActions from './auth.actions';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.login),
        exhaustMap(action => {
          return from(
            this.authService.handleLogin(action.email, action.password)
          ).pipe(
            switchMap(user => {
              console.log('Login Successful');
              return of(() => EMPTY);
            }),
            catchError(err => {
              return of(
                authActions.unsuccessfulLogin({ errorMessage: err.message })
              );
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  successfulLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.successfulLogin),
        exhaustMap(() => {
          // this.router.navigateByUrl('/dashboard');
          return of(() => EMPTY); //TODO add login functionality
        })
      );
    },
    { dispatch: false }
  );

  unsuccessfulLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.unsuccessfulLogin),
        exhaustMap(action => {
          console.log('Login not successful');
          this.snackbarService.openSnackbar(
            action.errorMessage,
            'I understand'
          );
          return of(() => EMPTY);
        })
      );
    },
    { dispatch: false }
  );

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
}
