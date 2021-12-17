import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { Transaction } from 'src/app/core/models';
import { AccountOwner } from 'src/app/core/models';
import { Account } from '../../core/models';

export const authFeatureKey = 'auth';

export interface State {}

export const initialState: State = {};

export const reducers: ActionReducerMap<State> = {};
