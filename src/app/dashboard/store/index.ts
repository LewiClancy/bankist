import { createReducer, on } from '@ngrx/store';

import { Account, AccountOwner, Transaction } from 'src/app/core/models';
import * as dashboardActions from './dashboard.actions';

export const dashboardFeatureKey = 'dashboard';

export interface DashboardState {
  accountOwner: AccountOwner | undefined;
  accountInfo: Account | undefined;
  transactions: Transaction[];
}

export const initialState: DashboardState = {
  accountOwner: undefined,
  accountInfo: undefined,
  transactions: [],
};

export const DashboardReducer = createReducer(
  initialState,

  on(dashboardActions.clearDashbordStore, state => {
    return {
      ...state,
      accountOwner: undefined,
      accountInfo: undefined,
      transactions: [],
    };
  }),
  on(dashboardActions.loadAccountOwnerSuccessful, (state, { accountOwner }) => {
    return {
      ...state,
      accountOwner,
    };
  }),

  on(dashboardActions.loadAccountInfoSuccess, (state, { accountInfo }) => ({
    ...state,
    accountInfo,
  })),

  on(
    dashboardActions.loadAccountTransactionsSuccess,
    (state, { transactions }) => ({
      ...state,
      transactions,
    })
  )
);
