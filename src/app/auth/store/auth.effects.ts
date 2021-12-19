import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, exhaustMap, from, of, switchMap } from 'rxjs';
import * as authActions from './auth.actions'; // TODO reformat this import
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
      ofType(authActions.login),
      exhaustMap(action => {
        return from(
          this.authService.handleLogin(action.email, action.password)
        ).pipe(
          switchMap(user => {
            console.log(user.user?.uid, user.user?.email);
            const uid = user.user?.uid;
            const email = user.user?.email;
            return of(authActions.successfulLogin({ uid, email }));
          }),
          catchError(err => {
            return of(
              authActions.unsuccessfulLogin({ errorMessage: err.message })
            );
          })
        );
      })
    );
  });

  successfulLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.successfulLogin),
        exhaustMap(() => {
          console.log('Login Successful');
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

  //TODO Add logout functionality
}
