import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, map, of, switchMap, tap, throwError } from 'rxjs';
import { selectUid } from 'src/app/auth/store/auth.selectors';
import { AppState } from 'src/app/store';
import { DashboardService } from '../dashboard.service';

import * as dashboardEffects from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  constructor(
    private dsService: DashboardService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  LoadAccountOwner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dashboardEffects.loadAccountOwner),
      concatLatestFrom(() => this.store.select(selectUid)),
      switchMap(([_, accountOwnerId]) => {
        if (!accountOwnerId) {
          return of(dashboardEffects.loadAccountOwnerFailed());
        }

        return this.dsService.loadAccountOwner(accountOwnerId).pipe(
          switchMap(accountOwner =>
            of(
              dashboardEffects.loadAccountOwnerSuccessful({ accountOwner }),
              dashboardEffects.loadAccountInfo({
                accountId: accountOwner.accountId,
              })
            )
          ),
          catchError(() => of(dashboardEffects.loadAccountOwnerFailed()))
        );
      })
    );
  });

  loadAccountInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dashboardEffects.loadAccountInfo),
      switchMap(({ accountId }) => {
        return this.dsService.loadAccountInfo(accountId).pipe(
          switchMap(accountInfo => {
            console.log(accountInfo);
            return of(dashboardEffects.loadAccountInfoSuccess({ accountInfo }));
          }),
          catchError(() => {
            return of(dashboardEffects.loadAccountInfoNotSuccess());
          })
        );
      })
    );
  });
}
