import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTransactions from './index';

export const selectTransactionState =
  createFeatureSelector<fromTransactions.State>(
    fromTransactions.transactionsFeatureKey
  );

export const selectAllTransaction = createSelector(
  selectTransactionState,
  fromTransactions.selectTransactions
);

export const selectSelectedTransaction = createSelector(
  selectTransactionState,
  state => {
    const id = state.selectedTransactionId;
    if (id) {
      return state.entities[id];
    } else {
      return undefined;
    }
  }
);
