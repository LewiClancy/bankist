import { createAction, props } from '@ngrx/store';
import { Account, AccountOwner, Transaction } from 'src/app/core/models';

export const clearDashbordStore = createAction(
  '[Auth Sservice] Clear The Dashboard Store'
);

export const loadAccountOwner = createAction(
  '[Dashboard Component] Load Account Owner Information'
);

export const loadAccountOwnerSuccessful = createAction(
  '[Dashboard Effect] Load Account Owner Information Succeeded',
  props<{ accountOwner: AccountOwner }>()
);

export const loadAccountOwnerFailed = createAction(
  '[Dashboard Effect] Load Account Owner Information Failed'
);

export const loadAccountInfo = createAction(
  '[Dashboard Effect] Load Account Info',
  props<{ accountId: string }>()
);

export const loadAccountInfoSuccess = createAction(
  '[DashboardEffect] Account Info Loaded Successfully',
  props<{ accountInfo: Account }>()
);

//TODO use entity for this
export const loadAccountInfoNotSuccess = createAction(
  '[DashboardEffect] Account Info Loaded Successfully'
);

export const loadAccountTransactions = createAction(
  '[Dashboard Effect] Load Account Transactions',
  props<{ accountId: string }>()
);

export const loadAccountTransactionsSuccess = createAction(
  '[Dashboard Effect] Load Account Transactions Successful',
  props<{ transactions: Transaction[] }>()
);

export const loadAccountTransactionsFailed = createAction(
  '[Dashboard Effect] Load Account Transactions Failed'
);
