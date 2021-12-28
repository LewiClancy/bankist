import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromDashboard from './index';

export const selectDashboardState =
  createFeatureSelector<fromDashboard.DashboardState>(
    fromDashboard.dashboardFeatureKey
  );

export const selectAccountOwnerInfo = createSelector(
  selectDashboardState,
  state => state.accountOwner
);

export const selectAccountInfo = createSelector(
  selectDashboardState,
  state => state.accountInfo
);

export const selectAccountTransactions = createSelector(
  selectDashboardState,
  state => state.transactions
);

export const isDashboardLoaded = createSelector(
  selectAccountInfo,
  selectAccountOwnerInfo,
  (account, owner) => {
    return account && owner ? true : false;
  }
);
