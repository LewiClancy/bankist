import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, of, switchMap } from 'rxjs';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { TransactionsService } from '../transactions.service';
import * as tnxActions from './transactions.actions';
import { AppState } from 'src/app/store';
import {
  startLoading,
  stopLoading,
} from 'src/app/store/actions/loading.actions';
import { selectAccountId } from 'src/app/store/selectors/account.selectors';

@Injectable()
export class TransactionsEffects {
  loadTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tnxActions.loadTransactions),
      concatLatestFrom(() => this.store.select(selectAccountId)),
      switchMap(([action, accountId]) => {
        this.store.dispatch(startLoading());
        if (accountId) {
          return this.tnxService.loadTransactions(accountId).pipe(
            switchMap(transactions => {
              this.store.dispatch(stopLoading());
              return of(tnxActions.loadTransactionsSuccess({ transactions }));
            }),
            catchError(error => {
              this.store.dispatch(stopLoading());
              return of(
                tnxActions.loadTransactionsFail({ errorCode: error.code })
              );
            })
          );
        } else {
          return of(
            tnxActions.loadTransactionsFail({ errorCode: 'Unknown Error' })
          );
        }
      })
    );
  });

  showSelectedTransaction$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(tnxActions.selectTransaction),
        switchMap(({ transactionId }) => {
          this.router.navigate(['/transactions', transactionId]);
          return of(() => EMPTY);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private tnxService: TransactionsService,
    private store: Store<AppState>,
    private router: Router
  ) {}
}
