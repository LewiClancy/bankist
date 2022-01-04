import { createReducer, on } from '@ngrx/store';
import { Account, Transaction } from 'src/app/core/models';
import * as accountActions from '../actions/account.actions';

export const accountFeaturekey = 'account';

export interface AccountState {
  accountInfo: Account | undefined;
  recentTransactions: Transaction[];
}

export const initialState: AccountState = {
  accountInfo: undefined,
  recentTransactions: [],
};

export const reducer = createReducer(
  initialState,

  on(accountActions.loadAccountInfoSuccess, (state, { accountInfo }) => {
    return {
      ...state,
      accountInfo,
    };
  }),

  on(
    accountActions.loadRecentTransactionsSuccess,
    (state, { recentTransactions }) => {
      return {
        ...state,
        recentTransactions,
      };
    }
  ),

  on(accountActions.clearAccountStore, state => ({
    ...state,
    accountInfo: undefined,
    recentTransactions: [],
  }))
);
