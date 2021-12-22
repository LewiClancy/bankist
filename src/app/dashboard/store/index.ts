import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';

import * as fromDashboard from './dashboard.actions';
import { Account, AccountOwner, Transaction } from 'src/app/core/models';

export const dashboardFeatureKey = 'dashboard';

export interface State {
  accountOwner: AccountOwner | undefined;
  accountInfo: Account | undefined;
  transactions: Transaction[];
}

export const initialState: State = {
  accountOwner: undefined,
  accountInfo: undefined,
  transactions: [],
};

export const DashboardReducer = createReducer(
  initialState,

  on(fromDashboard.loadAccountOwnerSuccessful, (state, { accountOwner }) => {
    return {
      ...state,
      accountOwner,
    };
  }),

  on(fromDashboard.loadAccountInfoSuccess, (state, { accountInfo }) => ({
    ...state,
    accountInfo,
  })),

  on(
    fromDashboard.loadAccountTransactionsSuccess,
    (state, { transactions }) => ({
      ...state,
      transactions,
    })
  )
);
