import { createAction, props } from '@ngrx/store';
import { Transaction } from 'src/app/core/models';

export const loadTransactions = createAction(
  '[Transaction Component] Load All Account Transactions' //TODO  use pagination
);

export const loadTransactionsSuccess = createAction(
  '[Transaction Effects] Transactions loaded successfully',
  props<{ transactions: Transaction[] }>()
);

export const loadTransactionsFail = createAction(
  '[Transaction Effects] Transactions loading failed',
  props<{ errorCode: string }>()
);

export const selectTransaction = createAction(
  '[Transaction List Component] Select Transaction for more information',
  props<{ transactionId: string }>()
);

export const clearSelectedTransaction = createAction(
  '[Transaction List Component] Clear the selected transaction'
);

export const clearTransactionStore = createAction(
  '[Transaction Effects] Clear the transaction store on Sign Out'
);
