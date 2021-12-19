import { state } from '@angular/animations';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
  props,
} from '@ngrx/store';
import { Transaction } from 'src/app/core/models';
import { AccountOwner } from 'src/app/core/models';
import { Account } from '../../core/models';
import * as authActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  uid: string | undefined;
  email: string | undefined | null;
}

export const initialState: AuthState = {
  uid: undefined,
  email: undefined,
};

export const reducer = createReducer(
  initialState,
  on(authActions.successfulLogin, (state: AuthState, { email, uid }) => {
    return {
      ...state,
      uid,
      email,
    };
  }),

  on(authActions.signOut, state => ({
    ...state,
    uid: undefined,
    email: undefined,
  }))
);
