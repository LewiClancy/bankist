import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, map, of, switchMap, tap, throwError } from 'rxjs';
import { selectUid } from 'src/app/auth/store/auth.selectors';
import { AppState } from 'src/app/store';
import { DashboardService } from '../dashboard.service';

import * as dashboardActions from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  constructor(
    private dsService: DashboardService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  LoadAccountOwner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dashboardActions.loadAccountOwner),
      concatLatestFrom(() => this.store.select(selectUid)),
      switchMap(([_, accountOwnerId]) => {
        if (!accountOwnerId) {
          return of(dashboardActions.loadAccountOwnerFailed());
        }

        return this.dsService.loadAccountOwner(accountOwnerId).pipe(
          switchMap(accountOwner =>
            of(
              dashboardActions.loadAccountOwnerSuccessful({ accountOwner }),
              dashboardActions.loadAccountInfo({
                accountId: accountOwner.accountId,
              })
            )
          ),
          catchError(() => of(dashboardActions.loadAccountOwnerFailed()))
        );
      })
    );
  });

  loadAccountInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dashboardActions.loadAccountInfo),
      switchMap(({ accountId }) => {
        return this.dsService.loadAccountInfo(accountId).pipe(
          switchMap(accountInfo => {
            return of(
              dashboardActions.loadAccountInfoSuccess({ accountInfo }),
              dashboardActions.loadAccountTransactions({ accountId })
            );
          }),
          catchError(() => {
            return of(dashboardActions.loadAccountInfoNotSuccess());
          })
        );
      })
    );
  });

  loadAccountTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dashboardActions.loadAccountTransactions),
      switchMap(({ accountId }) => {
        return this.dsService.loadAccountTransactions(accountId).pipe(
          switchMap(transactions => {
            return of(
              dashboardActions.loadAccountTransactionsSuccess({
                transactions,
              })
            );
          }),
          catchError(() => of(dashboardActions.loadAccountTransactionsFailed()))
        );
      })
    );
  });
}
