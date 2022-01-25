import { createAction, props } from '@ngrx/store';
import { Account, Transaction } from 'src/app/core/models';

export const loadAccountInfo = createAction(
  '[Auth Effect] Load Account Info',
  props<{ accountId: string }>()
);

export const loadAccountInfoSuccess = createAction(
  '[Account Effects] Load Account Info Success',
  props<{ accountInfo: Account }>()
);

export const loadAccountInfoFailed = createAction(
  '[Account Effects] Load Account Info Failed',
  props<{ errorCode: string }>()
);

export const loadRecentTransactions = createAction(
  '[Account Effects] Load Recent Account Transactions',
  props<{ accountId: string }>()
);

export const loadRecentTransactionsSuccess = createAction(
  '[Account Effects] Load Recent Account Transactions Success',
  props<{ recentTransactions: Transaction[] }>()
);

export const loadRecentTransactionsFailed = createAction(
  '[Account Effects] Load Recent Account Transactions Failed',
  props<{ errorCode: string }>()
);
