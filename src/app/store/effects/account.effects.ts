import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

import * as accountActions from '../actions/account.actions';

@Injectable()
export class AccountEffects {
  constructor(private authService: AuthService, private actions$: Actions) {}

  loadAccountInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.loadAccountInfo),
      switchMap(({ accountId }) => {
        return this.authService.loadAccountInfo(accountId).pipe(
          switchMap(accountInfo => {
            return of(
              accountActions.loadAccountInfoSuccess({ accountInfo }),
              accountActions.loadRecentTransactions({ accountId })
            );
          }),
          catchError(error => {
            return of(
              accountActions.loadAccountInfoFailed({ errorCode: error.code })
            );
          })
        );
      })
    );
  });

  loadRecentTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.loadAccountInfo),
      switchMap(({ accountId }) => {
        return this.authService.loadRecentTransactions(accountId).pipe(
          switchMap(recentTransactions => {
            return of(
              accountActions.loadRecentTransactionsSuccess({
                recentTransactions,
              })
            );
          })
        );
      })
    );
  });
}
