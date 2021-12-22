import { createAction, props } from '@ngrx/store';
import { Account, AccountOwner } from 'src/app/core/models';

export const loadAccountOwner = createAction(
  '[Auth Effects] Load Account Owner Information'
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

export const loadAccountInfoNotSuccess = createAction(
  '[DashboardEffect] Account Info Loaded Successfully'
);
