import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Transaction } from 'src/app/core/models';
import * as transactionActions from './transactions.actions';

export const transactionsFeatureKey = 'transactions';

export interface State extends EntityState<Transaction> {
  selectedTransactionId: string | undefined;
}

export const transactionsAdapter: EntityAdapter<Transaction> =
  createEntityAdapter<Transaction>();

export const initialState = transactionsAdapter.getInitialState();

export const transactionsReducer = createReducer(
  initialState,
  on(transactionActions.loadTransactionsSuccess, (state, { transactions }) => {
    return transactionsAdapter.addMany(transactions, state);
  }),
  on(transactionActions.selectTransaction, (state, { transactionId }) => {
    return {
      ...state,
      selectedTransactionId: transactionId,
    };
  }),
  on(transactionActions.clearSelectedTransaction, state => {
    return {
      ...state,
      selectedTransactionId: undefined,
    };
  }),
  on(transactionActions.clearTransactionStore, state =>
    transactionsAdapter.removeAll(state)
  )
);

const { selectAll } = transactionsAdapter.getSelectors();

export const selectTransactions = selectAll;
