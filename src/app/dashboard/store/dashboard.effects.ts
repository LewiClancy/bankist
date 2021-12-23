import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, of, switchMap } from 'rxjs';
import { selectUserUid } from 'src/app/auth/store/auth.selectors';
import { AccountOwner } from 'src/app/core/models';
import { AppState } from 'src/app/store';
import { startLoading, stopLoading } from 'src/app/store/app-state.actions';
import { DashboardService } from '../dashboard.service';

import * as dashboardActions from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  LoadAccountOwner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dashboardActions.loadAccountOwner),
      concatLatestFrom(() => this.store.select(selectUserUid)),
      switchMap(([action, accountOwnerId]) => {
        this.store.dispatch(startLoading());
        if (!accountOwnerId) {
          return of(dashboardActions.loadAccountOwnerFailed());
        }

        const accOwnerInfo$ = this.dsService.loadAccountOwner(accountOwnerId);

        const accOwnerDisplayImage$ =
          this.dsService.loadUserProfileImage(accountOwnerId);

        const accountOwner$ = combineLatest([
          accOwnerInfo$,
          accOwnerDisplayImage$,
        ]);

        return accountOwner$.pipe(
          switchMap(([accOwnerinfo, displayImage]) => {
            let accountOwner: AccountOwner = {
              ...accOwnerinfo,
              displayImage,
            };
            return of(
              dashboardActions.loadAccountOwnerSuccessful({ accountOwner }),
              dashboardActions.loadAccountInfo({
                accountId: accountOwner.accountId,
              })
            );
          }),
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
            this.store.dispatch(stopLoading());
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

  constructor(
    private dsService: DashboardService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}
}
