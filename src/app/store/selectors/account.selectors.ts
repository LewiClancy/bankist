import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAccount from '../reducers/account.reducer';

export const selectAccountFeatureState =
  createFeatureSelector<fromAccount.AccountState>(
    fromAccount.accountFeaturekey
  );

export const selectAccountInfo = createSelector(
  selectAccountFeatureState,
  state => state.accountInfo
);

export const selectAccountId = createSelector(
  selectAccountInfo,
  state => state?.id
);

export const selectRecentTransactions = createSelector(
  selectAccountFeatureState,
  state => state.recentTransactions
);
