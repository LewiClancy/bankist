import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, exhaustMap, from, of, switchMap } from 'rxjs';
import {
  login,
  logout,
  successfulLogin,
  unsuccessfulLogin,
} from './auth.actions';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private store: Store
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      exhaustMap(action => {
        return from(
          this.authService.handleLogin(action.email, action.password)
        ).pipe(
          switchMap(() => {
            return of(successfulLogin());
          }),
          catchError(err => {
            return of(unsuccessfulLogin({ errorMessage: err.message }));
          })
        );
      })
    );
  });

  successfulLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(successfulLogin),
        exhaustMap(() => {
          console.log('Login successful');
          return of(() => EMPTY); //TODO add login functionality
        })
      );
    },
    { dispatch: false }
  );

  unsuccessfulLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(unsuccessfulLogin),
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

  //TODO Add logout functionality
}
