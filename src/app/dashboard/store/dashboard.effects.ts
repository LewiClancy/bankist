import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, of, switchMap } from 'rxjs';
import { DashboardService } from '../dashboard.service';

import * as dashboardEffects from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  constructor(private dsService: DashboardService, private actions$: Actions) {}

  LoadAccountOwner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dashboardEffects.loadAccountOwner),
      switchMap(({ accountOwnerId }) => {
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
